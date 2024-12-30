import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SkillsSection from './components/SkillsSection';
import ContactForm from './components/ContactForm';
import AnimatedBackground from './components/AnimatedBackground';
import ProjectCard from './components/ProjectCard';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'Projects', href: 'projects' },
    { name: 'Skills', href: 'skills' },
    { name: 'CV', href: 'cv' },
    { name: 'Contact', href: 'contact' },
  ];

  const projects = [
    {
      title: 'Compteur de Taxi',
      description: 'Compteur de Taxi is an Android application designed to help taxi drivers manage their fares efficiently. The app provides features such as driver profiles, fare calculations, and user-friendly interfaces to enhance the driving experience.',
      image: `${process.env.PUBLIC_URL}/Compteur de Taxi.png`,
      technologies: ['Android', 'Kotlin', 'XML'],
      githubLink: 'https://github.com/zenitsudono/Compteur-de-Taxi'
    },
    {
      title: 'Project 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'path/to/image.jpg', // Replace with actual image path
      technologies: ['React', 'Node.js'],
      liveLink: '', // Add live link if available
      githubLink: '',
    },
    {
      title: 'Project 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'path/to/image.jpg', // Replace with actual image path
      technologies: ['React', 'Node.js'],
      liveLink: '', // Add live link if available
      githubLink: '',
    },
  ];

  const handleDownloadCV = () => {
    const pdfUrl = `${process.env.PUBLIC_URL}/CV.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'CV Abderrahman Salmi.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-secondary text-gray-100">
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator" style={{ width: scrollProgress }} />

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">Portfolio</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden glass-effect">
            <nav className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="skills"
                smooth={true}
                duration={500}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Skills
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="cv"
                smooth={true}
                duration={500}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                CV
              </Link>
            </nav>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 to-transparent opacity-20 animate-spin-slow" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Profile Picture */}
            <div className="lg:flex-shrink-0 animate-float">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl hover:scale-105 transition-transform duration-300 animate-morph">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.jpg`}
                  alt="Salmi Abderrahman"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=SA';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-pulse-slow"></div>
                {/* Decorative Ring */}
                <div className="absolute -inset-4 border-4 border-primary/30 rounded-full animate-spin-slow"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
                <span className="gradient-text glitch animate-slide-up" data-text="Hello, I'm">Hello, I'm</span>
                <br />
                <span className="glow-text animate-slide-up" style={{ animationDelay: '0.2s' }}>Salmi Abderrahman</span>
              </h1>
              <p className="text-xl sm:text-2xl mb-4 text-gray-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                Mobile Developer & Robotics 
              </p>
              <p className="text-lg mb-8 text-gray-400 max-w-2xl animate-slide-up" style={{ animationDelay: '0.6s' }}>
                A versatile developer with a unique blend of mobile application development and robotics expertise. 
                I create innovative mobile solutions while also exploring the fascinating world of robotics and automation. 
                My passion lies in bridging the gap between software and hardware, bringing creative ideas to life through both mobile apps and robotic systems.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <Link
                  to="projects"
                  smooth={true}
                  duration={500}
                  className="btn-primary inline-block"
                >
                  View My Work
                </Link>
                <button
                  onClick={handleDownloadCV}
                  className="btn-primary inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  Download CV
                </button>
                <a
                  href="https://www.linkedin.com/in/salmi-abderrahman-1b296528a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block gradient-border"
                >
                  <span className="relative z-10 block px-6 py-3">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/zenitsudono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block gradient-border"
                >
                  <span className="relative z-10 block px-6 py-3">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <AnimatedBackground variant="skills" />
        <SkillsSection />
      </section>

      {/* CV Section */}
      <section id="cv" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">My  me</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Education */}
            <div className="p-6 rounded-lg gradient-border">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Education</h3>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">CITÉ DES MÉTIERS ET DES COMPÉTENCES</h4>
                  <p className="text-gray-400">Digital Development</p>
                  <ul className="mt-2 list-disc list-inside text-gray-400">
                    <li>Algorithmique</li>
                    <li>Programmation orientée objet</li>
                    <li>Développement de sites web</li>
                    <li>Développement des applications</li>
                  </ul>
                  <p className="text-sm text-gray-500">2024</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">LKHIBRA ACADEMY</h4>
                  <p className="text-gray-400">PYTHON PROGRAMMING & SOFT-SKILLS TRAINING</p>
                  <p className="text-sm text-gray-500">2023</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">ARD ESSALAM 2</h4>
                  <p className="text-gray-400">Baccalauréat Sciences Physiques</p>
                  <p className="text-sm text-gray-500">2022</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-6 rounded-lg gradient-border">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Certifications & Achievements</h3>
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">Premier Prix - Compétition Nationale du Robotique FSR</h4>
                  <p className="text-gray-400">Robotique</p>
                  <ul className="mt-2 list-disc list-inside text-gray-400">
                    <li>Premier robot: suiveur de ligne</li>
                    <li>Deuxième robot: suiveur de ligne plus capteur de couleur</li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">Participation à la journée Robotique ENSAJ</h4>
                  <p className="text-gray-400">2024</p>
                  <ul className="mt-2 list-disc list-inside text-gray-400">
                    <li>Première fonctionnalité: suiveur de ligne</li>
                    <li>Deuxième fonctionnalité: capteur de couleur</li>
                    <li>Troisième fonctionnalité: éviter l'obstacle</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="p-6 rounded-lg gradient-border">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Languages</h3>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">ARABE</h4>
                  <p className="text-gray-400">Langue Maternelle</p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">FRANÇAIS</h4>
                  <p className="text-gray-400">Courant</p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <h4 className="text-xl font-medium">ANGLAIS</h4>
                  <p className="text-gray-400">Intermédiaire</p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleDownloadCV}
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
            >
              Download Complete CV
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
            Get In Touch
          </h2>
          <div className="card p-8">
            <form className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Email"
                />
              </div>
              <div className="relative group">
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p> 2024 Salmi Abderrahman. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
