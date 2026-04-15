export const palettes = [
	{
		id: 'navy-indigo',
		name: 'Navy indigo',
		swatch: ['#0f172a', '#818cf8'],
		vars: {
			'--bg-color': 'rgb(15, 23, 42)',
			'--bg-color-2': 'rgb(22, 30, 52)',
			'--font-color': 'rgb(226, 232, 240)',
			'--font-color-2': 'rgb(148, 163, 184)',
			'--hover-color': 'rgb(165, 180, 252)',
			'--hover-color-bg': 'rgba(129, 140, 248, 0.14)',
			'--accent': 'rgb(129, 140, 248)',
			'--mouse-gradient': 'rgba(99, 102, 241, 0.2)',
		},
	},
	{
		id: 'teal-original',
		name: 'Teal original',
		swatch: ['#0f172a', '#5eead4'],
		vars: {
			'--bg-color': 'rgb(15, 23, 42)',
			'--bg-color-2': 'rgb(20, 26, 42)',
			'--font-color': 'rgb(213, 219, 230)',
			'--font-color-2': 'rgb(141, 151, 170)',
			'--hover-color': 'rgb(94, 234, 212)',
			'--hover-color-bg': 'rgba(20, 88, 77, 0.63)',
			'--accent': 'rgb(94, 234, 212)',
			'--mouse-gradient': 'rgba(31, 63, 122, 0.407)',
		},
	},
	{
		id: 'navy-mint',
		name: 'Navy mint',
		swatch: ['#0f172a', '#4ade80'],
		vars: {
			'--bg-color': 'rgb(15, 23, 42)',
			'--bg-color-2': 'rgb(22, 30, 52)',
			'--font-color': 'rgb(226, 232, 240)',
			'--font-color-2': 'rgb(148, 163, 184)',
			'--hover-color': 'rgb(134, 239, 172)',
			'--hover-color-bg': 'rgba(74, 222, 128, 0.12)',
			'--accent': 'rgb(74, 222, 128)',
			'--mouse-gradient': 'rgba(74, 222, 128, 0.16)',
		},
	},
	{
		id: 'graphite-cyan',
		name: 'Graphite cyan',
		swatch: ['#1c1c22', '#22d3ee'],
		vars: {
			'--bg-color': 'rgb(28, 28, 34)',
			'--bg-color-2': 'rgb(40, 40, 48)',
			'--font-color': 'rgb(236, 240, 244)',
			'--font-color-2': 'rgb(155, 162, 175)',
			'--hover-color': 'rgb(103, 232, 249)',
			'--hover-color-bg': 'rgba(34, 211, 238, 0.12)',
			'--accent': 'rgb(34, 211, 238)',
			'--mouse-gradient': 'rgba(34, 211, 238, 0.16)',
		},
	},
	{
		id: 'royal-electric',
		name: 'Royal electric',
		swatch: ['#0a0f1e', '#3b82f6'],
		vars: {
			'--bg-color': 'rgb(10, 15, 30)',
			'--bg-color-2': 'rgb(17, 24, 45)',
			'--font-color': 'rgb(226, 232, 240)',
			'--font-color-2': 'rgb(148, 163, 184)',
			'--hover-color': 'rgb(96, 165, 250)',
			'--hover-color-bg': 'rgba(59, 130, 246, 0.14)',
			'--accent': 'rgb(59, 130, 246)',
			'--mouse-gradient': 'rgba(59, 130, 246, 0.2)',
		},
	},
	{
		id: 'graphite-pink',
		name: 'Graphite pink',
		swatch: ['#1c1c22', '#f472b6'],
		vars: {
			'--bg-color': 'rgb(28, 28, 34)',
			'--bg-color-2': 'rgb(40, 40, 48)',
			'--font-color': 'rgb(236, 240, 244)',
			'--font-color-2': 'rgb(155, 162, 175)',
			'--hover-color': 'rgb(249, 168, 212)',
			'--hover-color-bg': 'rgba(244, 114, 182, 0.14)',
			'--accent': 'rgb(244, 114, 182)',
			'--mouse-gradient': 'rgba(244, 114, 182, 0.16)',
		},
	},
	{
		id: 'slate-gold',
		name: 'Slate gold',
		swatch: ['#14151c', '#eab308'],
		vars: {
			'--bg-color': 'rgb(20, 21, 28)',
			'--bg-color-2': 'rgb(30, 32, 42)',
			'--font-color': 'rgb(234, 236, 241)',
			'--font-color-2': 'rgb(150, 158, 172)',
			'--hover-color': 'rgb(250, 204, 21)',
			'--hover-color-bg': 'rgba(234, 179, 8, 0.12)',
			'--accent': 'rgb(234, 179, 8)',
			'--mouse-gradient': 'rgba(234, 179, 8, 0.14)',
		},
	},
	{
		id: 'navy-peach',
		name: 'Navy peach',
		swatch: ['#0f172a', '#fb923c'],
		vars: {
			'--bg-color': 'rgb(15, 23, 42)',
			'--bg-color-2': 'rgb(22, 30, 52)',
			'--font-color': 'rgb(226, 232, 240)',
			'--font-color-2': 'rgb(148, 163, 184)',
			'--hover-color': 'rgb(253, 186, 116)',
			'--hover-color-bg': 'rgba(251, 146, 60, 0.14)',
			'--accent': 'rgb(251, 146, 60)',
			'--mouse-gradient': 'rgba(251, 146, 60, 0.16)',
		},
	},
];

export function applyPalette(paletteId) {
	const palette = palettes.find((p) => p.id === paletteId) || palettes[0];
	const root = document.documentElement;
	Object.entries(palette.vars).forEach(([k, v]) => {
		root.style.setProperty(k, v);
	});
	return palette.id;
}
