import { useState, useEffect, useRef } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import Canvas from './components/canvas/Canvas';
import Info from './components/Info/Info';
import LanguageToggle from './components/LanguageToggle';
import projectsData from './data/projects.json';
import site from './data/site.json';
import { useLang, t } from './i18n';

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

function App() {
	const { lang } = useLang();
	const [selected, setSelected] = useState('about');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [fillHeight, setFillHeight] = useState(0);
	const sectionRefs = useRef({});
	const mainRef = useRef(null);
	const trackRef = useRef(null);
	const itemRefs = useRef([]);

	useEffect(() => {
		const recalc = () => {
			const track = trackRef.current;
			const idx = NAV_ITEMS.findIndex((it) => it.id === selected);
			const item = itemRefs.current[idx];
			if (!track || !item) return;
			const trackRect = track.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();
			const y = itemRect.top + itemRect.height / 2 - trackRect.top;
			setFillHeight(Math.max(0, y));
		};
		recalc();
		const t = setTimeout(recalc, 50);
		window.addEventListener('resize', recalc);
		return () => {
			clearTimeout(t);
			window.removeEventListener('resize', recalc);
		};
	}, [selected, lang]);

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

	return (
		<>
			<LanguageToggle />
			<Info isOpen={isOpen} setIsOpen={setIsOpen} project={selectedProject} />
			<div className="relative flex flex-col lg:flex-row min-h-screen lg:justify-center lg:gap-5 bg-fixed">
				<div className="hidden lg:block">
					<Canvas />
				</div>
				<aside className="w-full lg:w-130 px-6 lg:ml-10 pt-16 pb-10 lg:py-20 lg:h-screen lg:sticky lg:top-0 flex flex-col lg:justify-between">
					<div className='flex flex-col'>
						<div className="flex items-center gap-4 mb-5">
							{site.avatar && (
								<img
									src={site.avatar}
									alt={site.name}
									className="w-28 h-28 rounded-full object-cover border-2 border-[var(--accent)]/40 shadow-lg"
								/>
							)}
							<span className="status-pill">
								<span className="dot"></span>
								{t(site.status?.label, lang) || 'Building ContestarIA'}
							</span>
						</div>
						<h1>{site.name}</h1>
						<h2 className="mt-1 text-base lg:text-lg font-medium tracking-tight text-[var(--hover-color)]">
							{t(site.role, lang)}
						</h2>
						<p className='mt-3 max-w-80 font-normal text-[var(--font-color-2)]'>
							{t(site.tagline, lang)}
						</p>
						{site.social.email && (
							<a
								href={`mailto:${site.social.email}`}
								className="cta-email mt-5"
							>
								<i className="fa-solid fa-envelope"></i>
								<span>{lang === 'en' ? 'Get in touch' : 'Escríbeme'}</span>
								<i className="fa-solid fa-arrow-right cta-arrow"></i>
							</a>
						)}
						<nav className="text-[12px] font-bold text-[var(--font-color-2)] uppercase hidden lg:flex flex-col mt-15 gap-6 nav-timeline">
							<div ref={trackRef} className="nav-track" aria-hidden="true">
								<div
									className="nav-track-fill"
									style={{ height: `${fillHeight}px` }}
								/>
							</div>
							{NAV_ITEMS.map((item, idx) => {
								if (!site.nav[item.id]) return null;
								const isActive = selected === item.id;
								const num = String(idx + 1).padStart(2, '0');
								return (
									<div key={item.id} className='flex justify-between'>
										<a
											ref={(el) => { itemRefs.current[idx] = el; }}
											className={`nav-numbered-item group ${isActive ? 'active' : ''}`}
											href={`#${item.id}`}
											onClick={() => setSelected(item.id)}
										>
											<span className="nav-numbered-dot"></span>
											<span className="nav-numbered-num">{num}</span>
											<span className="nav-numbered-label">{t(site.nav[item.id], lang)}</span>
										</a>
									</div>
								);
							})}
						</nav>
					</div>
					<div className="flex flex-wrap gap-x-6 gap-y-3 justify-start mt-10 lg:mt-15">
						<a href={site.social.github} className="flex items-center transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-github text-[25px] mr-3"></i> GitHub
						</a>
						<a href={site.social.linkedin} className="flex items-center transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-linkedin text-[25px] mr-3"></i> LinkedIn
						</a>
					</div>
				</aside>
				<main ref={mainRef} className="w-full lg:w-150 px-6 lg:px-0 pb-16 lg:overflow-y-auto lg:pt-25 lg:pb-[45vh] lg:mr-10">
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
													className="w-16 h-16 rounded-lg object-contain bg-black/60 p-2 border border-white/10"
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
						{webProjects.map((project, idx) => (
							<ProjectCard
								key={idx}
								{...project}
								image={project.images[0]}
								onClick={() => handleProjectClick(project)}
							/>
						))}
						<a
							href={site.social.github}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-2 flex items-center justify-center gap-2 text-sm text-[var(--font-color-2)] hover:text-[var(--hover-color)] transition py-3 group"
						>
							<span>{lang === 'en' ? 'More projects on GitHub' : 'Más proyectos en GitHub'}</span>
							<i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
						</a>
					</section>

					<section ref={setRef('low')} className='flex flex-col gap-5' id='low'>
						<h2 className="mt-16 lg:mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-laptop-code"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>{t(site.sections.low, lang)}</span>
						</h2>
						{lowProjects.map((project, idx) => (
							<ProjectCard
								key={idx}
								{...project}
								image={project.images[0]}
								onClick={() => handleProjectClick(project)}
							/>
						))}
						<a
							href={site.social.github}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-2 flex items-center justify-center gap-2 text-sm text-[var(--font-color-2)] hover:text-[var(--hover-color)] transition py-3 group"
						>
							<span>{lang === 'en' ? 'More on GitHub (42 cursus, exercises, etc.)' : 'Más en GitHub (cursus 42, ejercicios, etc.)'}</span>
							<i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
						</a>
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
