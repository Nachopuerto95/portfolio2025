// Netlify serverless function that notifies a Telegram chat
// when someone lands on the portfolio. Configure two env vars
// in Netlify (Site settings -> Environment variables):
//   TELEGRAM_TOKEN    — the bot token from @BotFather
//   TELEGRAM_CHAT_ID  — your personal chat id (get via @userinfobot)
//
// Silently no-ops if either env var is missing, so the portfolio
// keeps working locally and in preview deploys.

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
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 16);

  // Rough device detection from the UA string
  let device = 'Desktop';
  if (/Mobi|Android/i.test(ua)) device = 'Mobile';
  if (/iPhone/i.test(ua)) device = 'iPhone';
  if (/iPad/i.test(ua)) device = 'iPad';

  // Pick a short browser label
  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';

  const locationLine = city ? `${city}, ${country}` : country;
  const text = [
    '🌐 *Nueva visita al portfolio*',
    `🕐 ${ts}`,
    `📍 ${locationLine}`,
    `↪️ ${referrer}`,
    `📱 ${device} · ${browser}`,
    `🗺️ Path: \`${path}\``,
    language !== '—' ? `🌍 ${language}` : null,
  ].filter(Boolean).join('\n');

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
    // swallow — we don't want to surface errors to the client
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

export const config = {
  path: '/api/notify-visit',
};
