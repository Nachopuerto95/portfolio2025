import { useLang, t } from '../../../i18n';

export default function ProjectCard({ title, description, tags, image, onClick }) {
	const { lang } = useLang();
	const resolvedTitle = t(title, lang);
	const resolvedDescription = t(description, lang);
	return (
		<div
			onClick={onClick}
			className="proyect-container
				group
				cursor-pointer
				border-t-[0px]
				border-t-white/0
				hover:bg-[var(--hover-color-bg)]
				flex p-5 rounded-lg justify-start
				hover:shadow-lg
				hover:border-t-[1px]
				hover:border-t-white/8
				transition
				duration-400">
			<img className="h-20 w-auto object-cover rounded" src={image} alt={resolvedTitle} />
			<div className="ml-5">
				<h2 className="text-m font-medium tracking-tight text-slate-200 mt-[-5px] mb-2 group-hover:text-[var(--hover-color)]">
					{resolvedTitle}{' '}
					<i className="ml-5 text-[13px] fa-solid fa-arrow-up-right-from-square"></i>
				</h2>
				<p className="text-sm text-[var(--font-color-2)] break-normal">
					{resolvedDescription.length > 310
						? `${resolvedDescription.substring(0, 310)}... ${lang === 'en' ? 'read more' : 'leer más'}`
						: resolvedDescription}
				</p>
				<div className="flex gap-2 flex-wrap mt-5">
					{tags &&
						tags.map((tag, idx) => (
							<div
								key={idx}
								className="bg-[var(--hover-color)]/8 text-[var(--hover-color)]/90 text-xs h-8 flex items-center px-3 justify-center rounded-full font-semibold">
								{tag}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
