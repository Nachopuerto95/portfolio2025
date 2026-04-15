import { useState, useEffect, useRef } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import Canvas from './components/canvas/Canvas';
import Info from './components/Info/Info';
import LanguageToggle from './components/LanguageToggle';
import DesignPicker from './components/DesignPicker';
import projectsData from './data/projects.json';
import site from './data/site.json';
import { useLang, t } from './i18n';
import { useStyle } from './styleContext';

const projects = projectsData.projects;

function renderParagraph(text, pKey) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
		if (chunk.startsWith('**') && chunk.endsWith('**')) {
			return <strong key={i}>{chunk.slice(2, -2)}</strong>;
		}
		return <span key={i}>{chunk}</span>;
	});
	return <p key={pKey} className="mb-4">{parts}</p>;
}

function renderRichText(text) {
	if (!text) return null;
	return text.split(/\n\s*\n/).map((p, i) => renderParagraph(p, i));
}

const NAV_ITEMS = [
	{ id: 'about' },
	{ id: 'experience' },
	{ id: 'web' },
	{ id: 'low' },
	{ id: 'highlights' },
];

function NavItem({ item, idx, selected, setSelected, label, navStyle }) {
	const isActive = selected === item.id;
	const num = String(idx + 1).padStart(2, '0');
	const commonAnchor = `flex items-center gap-3 ${isActive ? 'selected' : ''}`;
	const onClick = () => setSelected(item.id);

	if (navStyle === 'numbers') {
		return (
			<a className={commonAnchor} href={`#${item.id}`} onClick={onClick}>
				<span className="nav-num">{num}</span>
				<span>{label}</span>
			</a>
		);
	}
	if (navStyle === 'dots') {
		return (
			<a className={commonAnchor} href={`#${item.id}`} onClick={onClick}>
				<span className={`nav-dot ${isActive ? 'active' : ''}`}></span>
				<span>{label}</span>
			</a>
		);
	}
	if (navStyle === 'minimal') {
		return (
			<a className={`nav-minimal ${isActive ? 'selected' : ''}`} href={`#${item.id}`} onClick={onClick}>
				<span>{label}</span>
			</a>
		);
	}
	// bars (default / Chiang)
	return (
		<a className={`flex ${isActive ? 'selected' : ''}`} href={`#${item.id}`} onClick={onClick}>
			<span className='menu-bar mr-4'></span>
			{label}
		</a>
	);
}

function ProjectList({ items, onClick, cardStyle }) {
	const { lang } = useLang();
	if (cardStyle === 'numbered') {
		return (
			<ol className="flex flex-col gap-2">
				{items.map((project, idx) => {
					const num = String(idx + 1).padStart(2, '0');
					return (
						<li
							key={idx}
							onClick={() => onClick(project)}
							className="card-numbered group cursor-pointer flex gap-5 items-baseline py-4 border-b border-white/5 hover:border-[var(--accent)]/40 transition"
						>
							<span className="card-num">{num}</span>
							<div className="flex-1">
								<h3 className="font-bold text-base group-hover:text-[var(--hover-color)] transition">
									{t(project.title, lang)}
									<i className="ml-3 text-[12px] fa-solid fa-arrow-up-right-from-square opacity-50 group-hover:opacity-100"></i>
								</h3>
								<p className="text-sm text-[var(--font-color-2)] mt-1">
									{(() => {
										const desc = t(project.description, lang);
										return desc.length > 180 ? desc.substring(0, 180) + '…' : desc;
									})()}
								</p>
								<div className="flex gap-2 flex-wrap mt-2">
									{project.tags?.map((tag, ti) => (
										<span key={ti} className="text-[11px] text-[var(--hover-color)]/80 font-semibold">
											{tag}{ti < project.tags.length - 1 ? ' · ' : ''}
										</span>
									))}
								</div>
							</div>
						</li>
					);
				})}
			</ol>
		);
	}

	if (cardStyle === 'minimal') {
		return (
			<div className="flex flex-col gap-3">
				{items.map((project, idx) => (
					<div
						key={idx}
						onClick={() => onClick(project)}
						className="group cursor-pointer p-4 rounded-lg hover:bg-[var(--hover-color-bg)] transition"
					>
						<h3 className="font-bold text-base group-hover:text-[var(--hover-color)] transition">
							{t(project.title, lang)}
							<i className="ml-3 text-[12px] fa-solid fa-arrow-up-right-from-square opacity-50"></i>
						</h3>
						<p className="text-sm text-[var(--font-color-2)] mt-1">
							{(() => {
								const desc = t(project.description, lang);
								return desc.length > 150 ? desc.substring(0, 150) + '…' : desc;
							})()}
						</p>
						<div className="flex gap-2 flex-wrap mt-2">
							{project.tags?.map((tag, ti) => (
								<span key={ti} className="bg-[var(--hover-color)]/8 text-[var(--hover-color)]/80 text-[10px] px-2 py-0.5 rounded-full font-semibold">
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		);
	}

	// default
	return (
		<>
			{items.map((project, idx) => (
				<ProjectCard
					key={idx}
					{...project}
					image={project.images[0]}
					onClick={() => onClick(project)}
				/>
			))}
		</>
	);
}

function App() {
	const { lang } = useLang();
	const { style } = useStyle();
	const [selected, setSelected] = useState('about');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const sectionRefs = useRef({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setSelected(visible[0].target.id);
			},
			{
				rootMargin: '-30% 0px -50% 0px',
				threshold: [0.1, 0.3, 0.5, 0.75],
			}
		);
		Object.values(sectionRefs.current).forEach((el) => {
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	const handleProjectClick = (project) => {
		setSelectedProject(project);
		setIsOpen(true);
	};

	const setRef = (id) => (el) => {
		sectionRefs.current[id] = el;
	};

	const webProjects = projects.filter((p) => p.web);
	const lowProjects = projects.filter((p) => !p.web);

	const heroMassive = style.hero === 'massive';

	return (
		<>
			<LanguageToggle />
			<DesignPicker />
			<Info isOpen={isOpen} setIsOpen={setIsOpen} project={selectedProject} />
			{style.bg === 'grain' && <div className="grain-bg"></div>}
			<div className="relative flex flex-col lg:flex-row min-h-screen lg:justify-center lg:gap-5 bg-fixed">
				{style.bg === 'canvas' && (
					<div className="hidden lg:block">
						<Canvas />
					</div>
				)}
				<aside className={`w-full lg:w-130 px-6 lg:ml-10 pt-16 pb-10 lg:py-20 lg:h-screen lg:sticky lg:top-0 flex flex-col lg:justify-between`}>
					<div className='flex flex-col'>
						<div className="mb-4">
							<span className="status-pill">
								<span className="dot"></span>
								{t(site.status?.label, lang) || 'Building @ Datista'}
							</span>
						</div>
						<h1 className={heroMassive ? 'hero-massive' : ''}>{site.name}</h1>
						<h2 className={`mt-1 font-medium tracking-tight text-[var(--hover-color)] ${heroMassive ? 'text-2xl lg:text-3xl' : 'text-base lg:text-lg'}`}>
							{t(site.role, lang)}
						</h2>
						<p className={`mt-3 font-normal text-[var(--font-color-2)] ${heroMassive ? 'max-w-lg' : 'max-w-80'}`}>
							{t(site.tagline, lang)}
						</p>
						<nav className={`text-[12px] font-bold text-[var(--font-color-2)] uppercase hidden lg:flex flex-col mt-15 gap-4 nav-style-${style.nav}`}>
							{NAV_ITEMS.map((item, idx) =>
								site.nav[item.id] ? (
									<div key={item.id} className='flex justify-between'>
										<NavItem
											item={item}
											idx={idx}
											selected={selected}
											setSelected={setSelected}
											label={t(site.nav[item.id], lang)}
											navStyle={style.nav}
										/>
									</div>
								) : null
							)}
						</nav>
					</div>
					<div className="flex space-x-4 gap-8 justify-start mt-10 lg:mt-15">
						<a href={site.social.github} className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-github text-[25px] mr-3"></i> GitHub
						</a>
						<a href={site.social.linkedin} className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-linkedin text-[25px] mr-3"></i> Linkedin
						</a>
					</div>
				</aside>
				<main className="w-full lg:w-150 px-6 lg:px-0 pb-16 lg:overflow-y-auto lg:py-25 lg:mr-10">
					<section ref={setRef('about')} id='about'>
						<div className='text-[var(--font-color-2)]'>
							{renderRichText(t(site.about, lang))}
						</div>
					</section>

					{site.experience && site.experience.length > 0 && (
						<section ref={setRef('experience')} className='flex flex-col gap-5' id='experience'>
							<h2 className="mt-16 lg:mt-20 font-bold flex items-center space-x-2">
								<i className="fa-solid fa-briefcase"></i>
								<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
								<span>{t(site.sections.experience, lang)}</span>
							</h2>
							{site.experience.map((job, idx) => (
								<article key={idx} className="p-5 rounded-lg border-t border-white/8 bg-[var(--bg-color-2)]/40 transition hover:bg-[var(--hover-color-bg)]">
									<div className="flex justify-between items-start flex-wrap gap-2">
										<div className="flex items-center gap-3">
											{job.logo && (
												<img
													src={job.logo}
													alt={`${job.company} logo`}
													className="w-10 h-10 rounded-md object-contain bg-white/5 p-1 border border-white/10"
												/>
											)}
											<div>
												<h3 className="font-bold text-base">{job.company}</h3>
												<p className="text-[13px] text-[var(--font-color-2)]">{t(job.role, lang)}</p>
											</div>
										</div>
										<span className="text-[12px] text-[var(--font-color-2)] uppercase tracking-wide">{t(job.period, lang)}</span>
									</div>
									{job.description && (
										<p className="text-sm text-[var(--font-color-2)] mt-3">{t(job.description, lang)}</p>
									)}
									{(() => {
										const h = t(job.highlights, lang);
										return Array.isArray(h) && h.length > 0 ? (
											<ul className="mt-3 text-[13px] text-[var(--font-color-2)]">
												{h.map((line, hi) => (
													<li key={hi} className="my-2 ml-2 flex">
														<i className="text-[var(--hover-color)] fa-solid fa-angle-right mt-1.5 text-[8px] mr-2"></i>
														<span>{line}</span>
													</li>
												))}
											</ul>
										) : null;
									})()}
									{job.media && job.media.length > 0 && (
										<div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
											{job.media.map((m, mi) => (
												<img
													key={mi}
													src={m}
													alt={`${job.company} media ${mi + 1}`}
													className="w-full h-24 object-cover rounded-md border border-white/10 hover:border-[var(--accent)]/50 transition cursor-zoom-in"
												/>
											))}
										</div>
									)}
									{job.stack && job.stack.length > 0 && (
										<div className="flex gap-2 mt-4 flex-wrap">
											{job.stack.map((tag, ti) => (
												<span key={ti} className="bg-[var(--hover-color-bg)] text-[var(--hover-color)] text-[11px] px-3 py-1 rounded-full font-semibold">
													{tag}
												</span>
											))}
										</div>
									)}
								</article>
							))}
						</section>
					)}

					<section ref={setRef('web')} className='flex flex-col gap-5' id='web'>
						<h2 className="mt-16 lg:mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-globe"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>{t(site.sections.web, lang)}</span>
						</h2>
						<ProjectList items={webProjects} onClick={handleProjectClick} cardStyle={style.card} />
					</section>

					<section ref={setRef('low')} className='flex flex-col gap-5' id='low'>
						<h2 className="mt-16 lg:mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-laptop-code"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>{t(site.sections.low, lang)}</span>
						</h2>
						<ProjectList items={lowProjects} onClick={handleProjectClick} cardStyle={style.card} />
					</section>

					{site.highlights && site.highlights.length > 0 && (
						<section ref={setRef('highlights')} className='flex flex-col gap-5' id='highlights'>
							<h2 className="mt-16 lg:mt-20 font-bold flex items-center space-x-2">
								<i className="fa-solid fa-award"></i>
								<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
								<span>{t(site.sections.highlights, lang)}</span>
							</h2>
							<div className="flex flex-col gap-3">
								{site.highlights.map((h, idx) => (
									<div key={idx} className="flex items-start gap-4 p-4 rounded-lg border-t border-white/8 bg-[var(--bg-color-2)]/40">
										<i className={`${h.icon || 'fa-solid fa-award'} text-[var(--hover-color)] text-xl mt-1`}></i>
										<div>
											<h3 className="font-bold text-sm">{t(h.title, lang)}</h3>
											{h.where && <p className="text-[12px] text-[var(--font-color-2)]">{t(h.where, lang)}</p>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}
				</main>
			</div>
		</>
	);
}

export default App;
