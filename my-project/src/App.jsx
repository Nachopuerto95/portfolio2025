import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/Projects/ProjectCard/ProjectCard';
import web1 from './assets/web1.png'
import web2 from './assets/web2.png'

function App() {

	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [selected, setSelected] = useState('about')

	useEffect(() => {
		const updateMouse = (e) => {
			setPos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMouse);
		return () => window.removeEventListener("mousemove", updateMouse);
	}, []);

return (
	<>
		<div className="flex min-h-screen justify-center gap-5 bg-fixed"
		style={{
			backgroundImage: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--mouse-gradient), transparent 70%)`,
		}}>
		<aside className="w-130 ml-10 py-20 h-screen sticky top-0 flex flex-col justify-between bg-[]">
			<div className='flex flex-col'>
				<h1 className="">Nacho Puerto</h1>
				<h2 className="text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
					Full stack & low level developer
				</h2>
				<p className='mt-3 max-w-80 font-normal text-[var(--font-color-2)]'>Versatilidad entre la creatividad del Front-end y la lógica de los sistemas</p>
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
						<span className='menu-bar mr-4'></span>Full-stack Web develompent
					</a>
				</div>
								<div className='flex justify-between'>
					<a 
					className={`flex ${selected === 'low' ? 'selected' : ''}`}
					href="#low"
					onClick={() => setSelected('low')}>
						<span className='menu-bar mr-4'></span>Low-leveñ & Algorithms
					</a>
				</div>
				</nav>
			</div>
			<div className="flex space-x-4 mt-4 gap-8 justify-center mt-15">
			<a href="#" className="flex transition duration-300 hover:[text-shadow:0_0_8px_rgba(255,259,255,0.9)] hover:text-[var(--hover-color)]">
				<i classNAme="fa-brands fa-github text-[25px] mr-3"></i> GitHub
			</a>
			<a href="#" className="flex transition duration-300 hover:[text-shadow:0_0_8px_rgba(255,259,255,0.9)] hover:text-[var(--hover-color)]">
				<i classNAme="fa-brands fa-linkedin text-[25px] mr-3"></i>
				Linkedin
			</a>
			</div>

		</aside>
		<main className="w-150 overflow-y-auto py-25 mr-10" p>
			<section className='' id='Aboutme'
			 onMouseEnter={() => setSelected('about')}>
				<p className='text-[var(--font-color-2)]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim, diam ac egestas ultricies, orci purus suscipit tortor, quis dictum est ipsum sit amet enim. Sed nec tempor est. Sed a lacinia elit, id rhoncus dui.<br/><br/> Pellentesque id consequat lorem. Mauris sit amet rutrum quam. Suspendisse lobortis risus a diam pellentesque, in gravida ex laoreet. Nullam felis nisl, fringilla id interdum a, blandit vel erat. Morbi lobortis sollicitudin orci et dignissim. Phasellus sapien dui, tempus vitae auctor a, condimentum sit amet enim. Praesent et dolor elementum, aliquet magna at, faucibus ipsum. Suspendisse potenti. Aliquam ullamcorper est tortor, quis molestie eros consequat in.<br/><br/>amet rutrum quam. Suspendisse lobortis risus a diam pellentesque, in gravida ex laoreet. Nullam felis nisl, fringilla id interdum a, blandit vel erat. Morbi lobortis sollicitudin orci et dignissim. Phasellus sapien dui, tempus vitae auctor a, condimentum sit amet enim. Praesent et dolor elementum, aliquet magna at, faucibus ipsum. Suspendisse potenti. Aliquam ullamcorper est tortor, quis molestie eros consequat in.</p>
			</section>
			<section  className='flex flex-col gap-5' id='web'
			onMouseEnter={() => setSelected('web')}>
				<h2 className="mt-20 font-bold flex items-center space-x-2">
					<i classNAme="fa-solid fa-globe"></i> 
					<span className="w-8 border-b-2 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
					<span>Full-stack Web development projects</span>
				</h2>
				<ProjectCard
				image={web1}
				title="Fit-Tracker"
				description="Praesent et dolor elementum, aliquet magna at, faucibus ipsum. Suspendisse potenti. Aliquam ullamcorper est tortor, quis molestie eros consequat in."
				tags={["JavaScript", "React", "Node.js", "MongoDB", "Docker", "HTML & CSS"]}
				/>
				<ProjectCard
				image={web2}
				title="Reelations"
				description="Praesent et dolor elementum, aliquet magna at, faucibus ipsum. Suspendisse potenti. Aliquam ullamcorper est tortor, quis molestie eros consequat in."
				tags={["JavaScript", "Node.js", "Handlebars", "HTML & CSS"]}
				/>
			</section>
			<section className='' id='low'
			onMouseEnter={() => setSelected('low')}>
				<h2 className="mt-20 font-bold flex items-center space-x-2">
					<i classNAme="fa-solid fa-laptop-code"></i>
					<span className="w-8 border-b-2 border-[var(--font-color)] border-b-[0.5px] mx-5"></span>
					<span>Low-level & Algorithms</span>
				</h2>
				<p className='text-[var(--font-color-2)]'>Hola buenos dias dias que pasa me gustaria decir que lo siento pero la verdad que no mucho por que ni idea dias que pasa me gustaria decir que lo siento pero la verdad que no mucho por que ni idea dias que pasa me gustaria decir que lo siento pero la verdad que no mucho por que ni idea que pasa me gustaria decir que lo siento pero la verdad que no mucho por que ni idea</p>
			</section>
		</main>
		</div>
	</>
  );
}

export default App
