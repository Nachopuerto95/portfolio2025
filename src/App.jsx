import { useState } from 'react'
import './App.css'
import ReactPlayer from 'react-player'
import myVideo1 from './assets/a392-a84f-4afa-87d7-a33d8a9e6edc_1.mp4'
import imagevid1 from './assets/Captura de pantalla 2024-05-23 103818.png'
import myVideo2 from './assets/b870-899b-4384-acc1-090c4cfe495a_1.mp4'
import myVideo3 from './assets/Adventure Forest - Google Chrome 2024-05-23 11-11-31_1.mp4'
import imagevid2 from './assets/Captura de pantalla 2024-05-23 114627.png'
import nacho from './assets/WhatsApp Image 2024-05-23 at 18.24.44.jpeg'
import imagevid3 from './assets/Captura de pantalla 2024-04-27 152320.png'
import myCV from './assets/CVNACHO1.pdf'



function App() {
  const [playing, setPlaying] = useState(true);
  const [showLight, setShowLight] = useState(false);

  const handleVideoEnd = () => {
    setPlaying(false);
    setShowLight(true);
  };

  return (
    <>
    <div className='top-bar d-flex '>
        <img src="../public/favicon.svg" className='logo-top' alt="" />
        <h3>Nacho Puerto</h3>
      </div>
    <main className='main-page container'>

    
    <div className="about container mt-5 ">
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-3 mb-3 mb-md-0">
          <img src={nacho} alt="Nacho" className="img-fluid myImg" />
        </div>
        <div className="col-md-6">
          <h1 className='hero-h1 '>Hi, I am Nacho!</h1>
          <h3 className='hero-h3'>Frontend developer and graphic designer</h3>
          <p><i className="fa-solid fa-envelope text-pink"></i> Nachopuerto95@gmail.com</p>
          <p><i className="fa-solid fa-phone text-pink"></i> 697563103</p>
          
          <div className='d-flex about-buttons'>
            <a href="http://www.linkedin.com/in/nacho-puerto-mendoza-93184b173"><button className=''><i className="fa-brands fa-linkedin"></i>Linkedin</button></a>
            <a href="https://github.com/Nachopuerto95"><button className=''><i className="fa-brands fa-square-github"></i>Github</button></a>
            <a href={myCV}><button className='bg-pink'><i className="fa-solid fa-file"></i>Curriculum</button></a>
          </div>
        </div>
      </div>
    </div>

    <div className="tech-logos d-flex">
            <div className="tech">
            <i className="fa-brands fa-react"></i>
            <p>React</p>
            </div>
            <div className="tech">
            <i class="fa-brands fa-node-js"></i>
            <p>Node.js</p>
            </div>
            <div className="tech">
            <i className="fa-brands fa-js"></i>
            <p>Javascript</p>
            </div>
            <div className="tech">
            <img className='mongo-img' src="https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-File.png" alt="" />
            <p>MongoDB</p>
            </div>
            <div className="tech">
            <i className="fa-brands fa-html5"></i>
            <p>HTML & CSS</p>
            </div>
          </div>

    <section className='projects-section'>
      <h1><i className="text-pink fa-solid fa-laptop-code"></i>My Projects</h1>



      <div className="project row align-items-start gap-3 justify-content-center">
          <div className="video-container col-1">
          <ReactPlayer
              url={myVideo1}
              light={imagevid1}
              volume={0.5}
              playing={true}
              width="500px"
              height="280px"
              onEnded={handleVideoEnd}
          >
          </ReactPlayer>
          </div>
          <div className='project-info  col-2 d-flex flex-column justify-content-center'>
              <h2>Fit tracker</h2>
              <h3>Exercise and nutrition tracking APP</h3>
              <p>An app where you can select a weekly workout and it will tell you every
              day your progress with weight exercises, the amount of calories and macronutrients
              ingested. It has graphs and calendars to access your history. You can access with username:
              nachopuerto password 1234567890, this user has more than 60 calendar entries to view the app
              with enough information.</p>
              <div className='d-flex about-buttons'>
                <a href="https://github.com/nacho-alex/project-module-3"><button className=''><i className="fa-brands fa-square-github"></i>Github</button></a>
                <a href="https://fit-tracker.fly.dev/login"><button className='bg-pink'><i className="fa-solid fa-link"></i>Link</button></a>
              </div>
          </div>
     
      </div>
      
      <div className="project row align-items-start gap-3 justify-content-center ">
          <div className="video-container col-1">
          <ReactPlayer
            url={myVideo2}
            light={imagevid3}
            volume={0.5}
            playing={true}ç
            width={500}
            height={280}
            onEnded={handleVideoEnd}
            >
          </ReactPlayer>
          </div>
          <div className='project-info  col-2 d-flex flex-column justify-content-center'>
              <h2>Reelations</h2>
              <h3>Film Social Network</h3>
              <p>
                Film social network featuring various functionalities such as random movie retrieval, searching, filtering, and more, including user, comments, and review CRUD operations</p>
                <div className='d-flex about-buttons'>
                <a href="https://github.com/nacho-alex/project-module2"><button className=''><i className="fa-brands fa-square-github"></i>Github</button></a>
                <a href="https://project-module2.fly.dev/"><button className='bg-pink'><i className="fa-solid fa-link"></i>Link</button></a>
              </div>
          </div>
      </div>

      <div className="project row align-items-start gap-3 justify-content-center ">
          <div className="video-container col-1">
          <ReactPlayer
            url={myVideo3}
            light={imagevid2}
            volume={0.5}
            playing={true}
            width={500}
            height={280}
            onEnded={handleVideoEnd}
            >
          </ReactPlayer>
          </div>
          <div className='project-info  col-2 d-flex flex-column justify-content-center'>
              <h2>Adventure forest</h2>
              <h3>Endless runner game</h3>
              <p>In this game you will have to survive by extending your life time by picking fruits and killing enemies, each time the player moves faster and faster and the whole game speeds up.</p>
              <div className='d-flex about-buttons'>
                <a href="https://github.com/Nachopuerto95/JUEGO-IRONHACK"><button className=''><i className="fa-brands fa-square-github"></i>Github</button></a>
                <a href="https://adventure-forest-nachopuerto.netlify.app/"><button className='bg-pink'><i className="fa-solid fa-link"></i>Link</button></a>
              </div>
          </div>
      </div>
    </section>

    <section className="about-me">
    <h1><i className="text-pink fa-solid fa-user"></i>About me</h1>

    <div className='aboutme-info'>
    <p>Fullstack developer with a special focus on front-end, graphic design and UX/UI design.<br></br><br></br>

    During my graphic design degree and after a couple of subjects related to web design I started to explore on my own and found a new passion, web development and programming.<br></br><br></br>

    To deepen my knowledge I trained as a Fullstack developer, with the aim of continuing to grow as a professional. Thanks to this I found a place where I could squeeze all my skills, bringing creativity, value and love to each project in which I participate. 
    </p>
    </div>



    </section>
      

      
    
      
    </main>
    <footer>
      Created by Nacho Puerto Mendoza 
     </footer>
    </>
  )
}

export default App
