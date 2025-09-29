import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import Canvas from './components/canvas/Canvas';
import Info from './components/Info/Info';
import projects from './data/projects.json';

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
						<h1 className="">Nacho Puerto</h1>
						<h2 className="text-lg font-medium tracking-tight text-[var] sm:text-xl">
							Full stack & low level developer
						</h2>
						<p className='mt-3 max-w-80 font-normal text-[var(--font-color-2)]'>
							Versatilidad entre la creatividad del Front-end y la lógica de los sistemas
						</p>
						<nav className='text-[12px] font-bold text-[var(--font-color-2)] uppercase flex flex-col mt-15 gap-4'>
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'about' ? 'selected' : ''}`}
									href="#about"
									onClick={() => setSelected('about')}>
									<span className='menu-bar mr-4'></span>About me
								</a>
							</div>
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'web' ? 'selected' : ''}`}
									href="#web"
									onClick={() => setSelected('web')}>
									<span className='menu-bar mr-4'></span>Full-stack Web development
								</a>
							</div>
							<div className='flex justify-between'>
								<a
									className={`flex ${selected === 'low' ? 'selected' : ''}`}
									href="#low"
									onClick={() => setSelected('low')}>
									<span className='menu-bar mr-4'></span>Low-level & Algorithms
								</a>
							</div>
						</nav>
					</div>
					<div className="flex space-x-4 gap-8 justify-start mt-15">
						<a href="https://github.com/Nachopuerto95" className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-github text-[25px] mr-3"></i> GitHub
						</a>
						<a href="https://www.linkedin.com/in/nacho-puerto-mendoza-93184b173/" className="flex transition duration-300 hover:text-[var(--hover-color)]">
							<i className="fa-brands fa-linkedin text-[25px] mr-3"></i> Linkedin
						</a>
					</div>
				</aside>
				<main className="w-150 overflow-y-auto py-25 mr-10">
					<section className='' id='about'
						onMouseEnter={() => setSelected('about')}>
						<p className='text-[var(--font-color-2)]'>
						Soy un <strong>Desarrollador Fullstack</strong> apasionado por crear soluciones tecnológicas que marquen la diferencia. Mi viaje en el mundo de la programación comenzó hace algunos años, cuando descubrí que el código no era solo una herramienta, sino mi verdadera vocación.
						<br /><br />

						Actualmente, estoy perfeccionando mis habilidades en <strong>42 Madrid (Fundación Telefónica)</strong>, una institución reconocida por su enfoque innovador de aprendizaje basado en proyectos y colaboración entre pares. Esta experiencia ha fortalecido mis conocimientos técnicos en <strong>lenguajes de bajo nivel como C y C++</strong>, además de mejorar mi capacidad para resolver problemas complejos, trabajar en equipo y adaptarme rápidamente a nuevas tecnologías.
						<br /><br />

						Creo firmemente que la programación es un arte que combina lógica, creatividad y aprendizaje constante. Cada proyecto representa una oportunidad para crecer, un reto que pone a prueba mi intelecto y mi capacidad para encontrar soluciones. Disfruto mucho del proceso.
						<br /><br />

						Mi carrera profesional comenzó en el ámbito del diseño gráfico. Sin embargo, al descubrir mi pasión por la tecnología, decidí redirigir mi camino hacia el desarrollo. Actualmente, busco una oportunidad laboral donde pueda aportar mi entusiasmo, dedicación y conocimientos. Me motiva especialmente formar parte de equipos innovadores donde pueda seguir desarrollándome y contribuir al éxito de proyectos desafiantes.
						<br /><br />
						</p>
					</section>
					<section className='flex flex-col gap-5' id='web'
						onMouseEnter={() => setSelected('web')}>
						<h2 className="mt-20 font-bold flex items-center space-x-2">
							<i className="fa-solid fa-globe"></i>
							<span className="w-8 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
							<span>Full-stack Web development projects</span>
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
							<span>Low-level & Algorithms</span>
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