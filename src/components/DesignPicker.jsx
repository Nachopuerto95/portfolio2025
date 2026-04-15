import { useEffect, useState } from 'react';
import { palettes, applyPalette } from '../palettes';
import { useStyle, DEFAULT_STYLE } from '../styleContext';

const PALETTE_KEY = 'palette';

const STYLE_GROUPS = [
	{
		key: 'nav',
		label: 'Nav',
		options: [
			{ value: 'bars', label: 'Bars (Chiang)' },
			{ value: 'numbers', label: 'Numbered' },
			{ value: 'dots', label: 'Dots' },
			{ value: 'minimal', label: 'Minimal' },
		],
	},
	{
		key: 'card',
		label: 'Cards',
		options: [
			{ value: 'default', label: 'Default (thumb-left)' },
			{ value: 'numbered', label: 'Numbered list' },
			{ value: 'minimal', label: 'Minimal (no thumb)' },
		],
	},
	{
		key: 'hero',
		label: 'Hero',
		options: [
			{ value: 'compact', label: 'Compact' },
			{ value: 'massive', label: 'Massive' },
		],
	},
	{
		key: 'bg',
		label: 'Fondo',
		options: [
			{ value: 'canvas', label: 'Canvas waves' },
			{ value: 'grain', label: 'Grain' },
			{ value: 'none', label: 'Plain' },
		],
	},
];

export default function DesignPicker() {
	const { style, setStyle } = useStyle();
	const [activePalette, setActivePalette] = useState(() => {
		if (typeof window === 'undefined') return palettes[0].id;
		return localStorage.getItem(PALETTE_KEY) || palettes[0].id;
	});
	const [open, setOpen] = useState(false);

	useEffect(() => {
		applyPalette(activePalette);
		localStorage.setItem(PALETTE_KEY, activePalette);
	}, [activePalette]);

	const reset = () => {
		setStyle(DEFAULT_STYLE);
		setActivePalette(palettes[0].id);
	};

	return (
		<div className="design-picker">
			<button
				type="button"
				className="design-picker-toggle"
				onClick={() => setOpen((o) => !o)}
				aria-label="Open design lab"
			>
				<i className="fa-solid fa-palette mr-2"></i>
				<span>Design lab</span>
			</button>
			{open && (
				<div className="design-picker-panel">
					<div className="dp-section">
						<div className="dp-section-title">Paleta</div>
						<div className="dp-palette-grid">
							{palettes.map((p) => (
								<button
									key={p.id}
									type="button"
									className={`dp-palette-chip ${activePalette === p.id ? 'active' : ''}`}
									onClick={() => setActivePalette(p.id)}
									title={p.name}
								>
									<span className="dp-palette-swatches">
										<span style={{ background: p.swatch[0] }}></span>
										<span style={{ background: p.swatch[1] }}></span>
									</span>
									<span>{p.name}</span>
								</button>
							))}
						</div>
					</div>

					{STYLE_GROUPS.map((group) => (
						<div key={group.key} className="dp-section">
							<div className="dp-section-title">{group.label}</div>
							<div className="dp-options">
								{group.options.map((opt) => (
									<button
										key={opt.value}
										type="button"
										className={`dp-option ${style[group.key] === opt.value ? 'active' : ''}`}
										onClick={() => setStyle({ [group.key]: opt.value })}
									>
										{opt.label}
									</button>
								))}
							</div>
						</div>
					))}

					<div className="dp-footer">
						<button type="button" className="dp-reset" onClick={reset}>
							Reset
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
