// Fire-and-forget: notify Telegram once per browser session
// that somebody landed on the site. Silent on failure.

const SESSION_KEY = 'visit-pinged';

export function pingVisit() {
	if (typeof window === 'undefined') return;

	// Skip local dev so you don't get notifications while working
	if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
		return;
	}

	try {
		if (sessionStorage.getItem(SESSION_KEY)) return;
		sessionStorage.setItem(SESSION_KEY, '1');
	} catch {
		// if storage is unavailable, just fire anyway
	}

	const payload = {
		path: location.pathname + location.search,
		referrer: document.referrer || '',
		userAgent: navigator.userAgent,
		language: navigator.language,
	};

	try {
		fetch('/api/notify-visit', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload),
			keepalive: true,
		}).catch(() => {});
	} catch {
		// noop
	}
}
