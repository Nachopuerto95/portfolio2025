import { useEffect, useState } from 'react';
import { palettes, applyPalette } from '../palettes';

const STORAGE_KEY = 'palette';

export default function PalettePicker() {
	const [active, setActive] = useState(() => {
		if (typeof window === 'undefined') return palettes[0].id;
		return localStorage.getItem(STORAGE_KEY) || palettes[0].id;
	});
	const [open, setOpen] = useState(false);

	useEffect(() => {
		applyPalette(active);
		localStorage.setItem(STORAGE_KEY, active);
	}, [active]);

	return (
		<div className="palette-picker">
			<button
				type="button"
				className="palette-picker-toggle"
				onClick={() => setOpen((o) => !o)}
				aria-label="Open palette picker"
			>
				<i className="fa-solid fa-palette mr-2"></i>
				<span className="hidden sm:inline">Paletas</span>
				<span className="ml-2 opacity-60">
					{palettes.find((p) => p.id === active)?.name}
				</span>
			</button>
			{open && (
				<div className="palette-picker-list">
					{palettes.map((p) => (
						<button
							key={p.id}
							type="button"
							className={`palette-chip ${active === p.id ? 'active' : ''}`}
							onClick={() => setActive(p.id)}
							title={p.name}
						>
							<span
								className="palette-chip-swatches"
								aria-hidden="true"
							>
								<span style={{ background: p.swatch[0] }}></span>
								<span style={{ background: p.swatch[1] }}></span>
							</span>
							<span className="palette-chip-name">{p.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
