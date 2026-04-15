import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({ lang: 'es', setLang: () => {} });

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState(() => {
		if (typeof window === 'undefined') return 'es';
		return localStorage.getItem('lang') || 'es';
	});

	useEffect(() => {
		localStorage.setItem('lang', lang);
		document.documentElement.lang = lang;
	}, [lang]);

	return (
		<LanguageContext.Provider value={{ lang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLang() {
	return useContext(LanguageContext);
}

/**
 * Resolve a translated value.
 * Accepts either a plain string (returned as-is) or an object { es, en }.
 * Falls back to ES if the requested language is missing.
 */
export function t(value, lang) {
	if (value == null) return '';
	if (typeof value === 'string') return value;
	if (typeof value === 'object') {
		return value[lang] ?? value.es ?? value.en ?? '';
	}
	return value;
}
