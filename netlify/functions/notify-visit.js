// Netlify serverless function: formats a session summary and
// sends it to Telegram when the visitor's tab is closed/hidden.
// Requires env vars TELEGRAM_TOKEN and TELEGRAM_CHAT_ID.

export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return new Response(JSON.stringify({ ok: true, skipped: 'no-env' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const country = request.headers.get('x-country') || context?.geo?.country?.code || '—';
  const city = context?.geo?.city || '';
  const referrer = body.referrer || '(direct)';
  const ua = body.userAgent || request.headers.get('user-agent') || '—';
  const path = body.path || '/';
  const language = body.language || '—';
  const duration = Number(body.duration) || 0;
  const isReturning = Boolean(body.isReturning);
  const lastSeenAt = body.lastSeenAt || null;
  const sections = Array.isArray(body.sectionsViewed) ? body.sectionsViewed : [];
  const clicks = Array.isArray(body.clicks) ? body.clicks : [];
  const now = new Date();
  const ts = now.toISOString().replace('T', ' ').slice(0, 16);

  // Device + browser detection
  let device = 'Desktop';
  if (/iPhone/i.test(ua)) device = 'iPhone';
  else if (/iPad/i.test(ua)) device = 'iPad';
  else if (/Android/i.test(ua)) device = 'Android';
  else if (/Mobi/i.test(ua)) device = 'Mobile';

  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';

  const locationLine = city ? `${city}, ${country}` : country;

  function fmtDuration(s) {
    if (!s || s < 1) return '<1s';
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return sec ? `${m}m ${sec}s` : `${m}m`;
  }

  function fmtSince(iso) {
    if (!iso) return '';
    const then = new Date(iso).getTime();
    if (!then) return '';
    const diff = Math.max(0, now.getTime() - then);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins || 1}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `hace ${days}d`;
    const months = Math.floor(days / 30);
    return `hace ${months}mo`;
  }

  const header = isReturning
    ? `🔁 *Visita repetida* ${lastSeenAt ? `(${fmtSince(lastSeenAt)})` : ''}`.trim()
    : `🌐 *Nueva visita*`;

  const clicksLine = clicks.length
    ? clicks.map((c) => c.name).slice(0, 8).join(' · ')
    : '—';

  const lines = [
    header,
    `🕐 ${ts}`,
    `📍 ${locationLine}`,
    `↪️ ${referrer}`,
    `📱 ${device} · ${browser}`,
    `🗺️ \`${path}\``,
    `⏱️ ${fmtDuration(duration)}`,
    `👁️ ${sections.length ? sections.join(' → ') : '—'}`,
    `🖱️ ${clicksLine}`,
    language !== '—' ? `🌍 ${language}` : null,
  ].filter(Boolean);

  const text = lines.join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    // swallow
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

export const config = {
  path: '/api/notify-visit',
};
