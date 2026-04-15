import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import Canvas from './components/canvas/Canvas';
import Info from './components/Info/Info';
import projectsData from './data/projects.json';
const projects = projectsData.projects;
import site from './data/site.json';

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
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'about' ? 'selected' : ''}`}
									href="#about"
									onClick={() => setSelected('about')}>
									<span className='menu-bar mr-4'></span>{site.nav.about}
								</a>
							</div>
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'web' ? 'selected' : ''}`}
									href="#web"
									onClick={() => setSelected('web')}>
									<span className='menu-bar mr-4'></span>{site.nav.web}
								</a>
							</div>
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'low' ? 'selected' : ''}`}
									href="#low"
									onClick={() => setSelected('low')}>
									<span className='menu-bar mr-4'></span>{site.nav.low}
								</a>
							</div>
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
					<section className='' id='about'
						onMouseEnter={() => setSelected('about')}>
						<div className='text-[var(--font-color-2)]'>
							{renderRichText(site.about)}
						</div>
					</section>
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
				</main>
			</div>
		</>
	);
}

export default App;
