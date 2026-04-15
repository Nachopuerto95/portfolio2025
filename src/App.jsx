import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import Canvas from './components/canvas/Canvas';
import Info from './components/Info/Info';
import projectsData from './data/projects.json';
import site from './data/site.json';

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
	{ id: 'about', key: 'about' },
	{ id: 'experience', key: 'experience' },
	{ id: 'web', key: 'web' },
	{ id: 'low', key: 'low' },
	{ id: 'highlights', key: 'highlights' },
];

function App() {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [selected, setSelected] = useState('about');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	useEffect(() => {
		const updateMouse = (e) => {
			setPos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMouse);
		return () => window.removeEventListener("mousemove", updateMouse);
	}, [])

	const handleProjectClick = (project) => {
		setSelectedProject(project);
		setIsOpen(true);
	};

	return (
		<>
			<Info isOpen={isOpen} setIsOpen={setIsOpen} project={selectedProject} />
			<div className="flex min-h-screen justify-center gap-5 bg-fixed">
				<Canvas />
				<aside className="w-130 ml-10 py-20 h-screen sticky top-0 flex flex-col justify-between">
					<div className='flex flex-col'>
						<h1 className="">{site.name}</h1>
						<h2 className="text-lg font-medium tracking-tight text-[var] sm:text-xl">
							{site.role}
						</h2>
						<p className='mt-3 max-w-80 font-normal text-[var(--font-color-2)]'>
							{site.tagline}
						</p>
						<nav className='text-[12px] font-bold text-[var(--font-color-2)] uppercase flex flex-col mt-15 gap-4'>
							{NAV_ITEMS.map(item => (
								site.nav[item.key] ? (
									<div key={item.id} className='flex justify-between'>
										<a
											className={`flex ${selected === item.id ? 'selected' : ''}`}
											href={`#${item.id}`}
											onClick={() => setSelected(item.id)}>
											<span className='menu-bar mr-4'></span>{site.nav[item.key]}
										</a>
									</div>
								) : null
							))}
						</nav>
					</div>
					<div className="flex space-x-4 gap-8 justify-start mt-15">
						<a href={site.social.github} className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-github text-[25px] mr-3"></i> GitHub
						</a>
						<a href={site.social.linkedin} className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-linkedin text-[25px] mr-3"></i> Linkedin
						</a>
					</div>
				</aside>
				<main className="w-150 overflow-y-auto py-25 mr-10">
					<section id='about' onMouseEnter={() => setSelected('about')}>
						<div className='text-[var(--font-color-2)]'>
							{renderRichText(site.about)}
						</div>
					</section>

					{site.experience && site.experience.length > 0 && (
						<section className='flex flex-col gap-5' id='experience'
							onMouseEnter={() => setSelected('experience')}>
							<h2 className="mt-20 font-bold flex items-center space-x-2">
								<i className="fa-solid fa-briefcase"></i>
								<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
								<span>{site.sections.experience}</span>
							</h2>
							{site.experience.map((job, idx) => (
								<article key={idx} className="p-5 rounded-lg border-t-1 border-white/8 bg-[var(--bg-color)]/40">
									<div className="flex justify-between items-baseline flex-wrap gap-2">
										<div>
											<h3 className="font-bold text-base">{job.company}</h3>
											<p className="text-[13px] text-[var(--font-color-2)]">{job.role}</p>
										</div>
										<span className="text-[12px] text-[var(--font-color-2)] uppercase tracking-wide">{job.period}</span>
									</div>
									{job.description && (
										<p className="text-sm text-[var(--font-color-2)] mt-3">{job.description}</p>
									)}
									{job.highlights && job.highlights.length > 0 && (
										<ul className="mt-3 text-[13px] text-[var(--font-color-2)]">
											{job.highlights.map((h, hi) => (
												<li key={hi} className="my-2 ml-2 flex">
													<i className="text-[var(--hover-color)] fa-solid fa-angle-right mt-1.5 text-[8px] mr-2"></i>
													<span>{h}</span>
												</li>
											))}
										</ul>
									)}
									{job.stack && job.stack.length > 0 && (
										<div className="flex gap-2 mt-4 flex-wrap">
											{job.stack.map((tag, ti) => (
												<span key={ti} className="bg-[var(--hover-color-bg)] text-[var(--hover-color)]/90 text-[11px] px-3 py-1 rounded-full font-semibold">
													{tag}
												</span>
											))}
										</div>
									)}
								</article>
							))}
						</section>
					)}

					<section className='flex flex-col gap-5' id='web'
						onMouseEnter={() => setSelected('web')}>
						<h2 className="mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-globe"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>{site.sections.web}</span>
						</h2>
						{projects.map((project, idx) =>
							project.web ? (
								<ProjectCard
									key={idx}
									{...project}
									image={project.images[0]}
									onClick={() => handleProjectClick(project)}
								/>
							) : null
						)}
					</section>
					<section className='flex flex-col gap-5' id='low'
						onMouseEnter={() => setSelected('low')}>
						<h2 className="mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-laptop-code"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>{site.sections.low}</span>
						</h2>
						{projects.map((project, idx) =>
							!project.web ? (
								<ProjectCard
									key={idx}
									{...project}
									image={project.images[0]}
									onClick={() => handleProjectClick(project)}
								/>
							) : null
						)}
					</section>

					{site.highlights && site.highlights.length > 0 && (
						<section className='flex flex-col gap-5' id='highlights'
							onMouseEnter={() => setSelected('highlights')}>
							<h2 className="mt-20 font-bold flex items-center space-x-2">
								<i className="fa-solid fa-award"></i>
								<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
								<span>{site.sections.highlights}</span>
							</h2>
							<div className="flex flex-col gap-3">
								{site.highlights.map((h, idx) => (
									<div key={idx} className="flex items-start gap-4 p-4 rounded-lg border-t-1 border-white/8 bg-[var(--bg-color)]/40">
										<i className={`${h.icon || 'fa-solid fa-award'} text-[var(--hover-color)] text-xl mt-1`}></i>
										<div>
											<h3 className="font-bold text-sm">{h.title}</h3>
											{h.where && <p className="text-[12px] text-[var(--font-color-2)]">{h.where}</p>}
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
