import { createContext, useContext, useEffect, useState } from 'react';

export const DEFAULT_STYLE = {
	nav: 'bars',
	card: 'default',
	hero: 'compact',
	bg: 'canvas',
};

const STORAGE_KEY = 'design-style';
const StyleContext = createContext({ style: DEFAULT_STYLE, setStyle: () => {} });

export function StyleProvider({ children }) {
	const [style, setStyleState] = useState(() => {
		if (typeof window === 'undefined') return DEFAULT_STYLE;
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
			return saved ? { ...DEFAULT_STYLE, ...saved } : DEFAULT_STYLE;
		} catch {
			return DEFAULT_STYLE;
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(style));
		document.documentElement.dataset.bg = style.bg;
	}, [style]);

	const setStyle = (patch) => setStyleState((s) => ({ ...s, ...patch }));

	return (
		<StyleContext.Provider value={{ style, setStyle }}>
			{children}
		</StyleContext.Provider>
	);
}

export function useStyle() {
	return useContext(StyleContext);
}
