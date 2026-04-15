// Session analytics: collects what the visitor did and sends a
// single summary to the Telegram function when the tab is hidden
// or closed. Uses navigator.sendBeacon when available so the
// request survives a page unload.

const LAST_SEEN_KEY = 'portfolio-last-seen';

let startedAt = Date.now();
let sectionsViewed = new Set();
let clicks = [];
let isReturning = false;
let lastSeenAt = null;
let sessionSent = false;
let initDone = false;

export function initVisit() {
	if (typeof window === 'undefined') return;
	if (initDone) return;
	initDone = true;

	// Skip local dev so notifications only fire in production
	if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
		return;
	}

	try {
		const prev = localStorage.getItem(LAST_SEEN_KEY);
		if (prev) {
			isReturning = true;
			lastSeenAt = prev;
		}
		localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
	} catch {
		// ignore storage errors
	}

	startedAt = Date.now();

	const send = () => {
		if (sessionSent) return;
		sessionSent = true;

		const duration = Math.round((Date.now() - startedAt) / 1000);
		const payload = {
			path: location.pathname + location.search,
			referrer: document.referrer || '',
			userAgent: navigator.userAgent,
			language: navigator.language,
			duration,
			isReturning,
			lastSeenAt,
			sectionsViewed: Array.from(sectionsViewed),
			clicks: clicks.slice(0, 30),
		};
		const body = JSON.stringify(payload);

		try {
			if (navigator.sendBeacon) {
				const blob = new Blob([body], { type: 'application/json' });
				navigator.sendBeacon('/api/notify-visit', blob);
			} else {
				fetch('/api/notify-visit', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body,
					keepalive: true,
				}).catch(() => {});
			}
		} catch {
			// noop
		}
	};

	window.addEventListener('pagehide', send);
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') send();
	});
}

export function trackSection(id) {
	if (id) sectionsViewed.add(id);
}

export function trackClick(name) {
	if (!name) return;
	clicks.push({
		name,
		at: Math.round((Date.now() - startedAt) / 1000),
	});
}

// Backwards-compat shim: some builds import pingVisit. Redirect.
export function pingVisit() {
	initVisit();
}
