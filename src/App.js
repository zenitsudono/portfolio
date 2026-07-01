import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Bars3Icon, XMarkIcon, AcademicCapIcon, CpuChipIcon, GlobeAltIcon, TrophyIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import SkillsSection from './components/SkillsSection';
import ContactForm from './components/ContactForm';
import AnimatedBackground from './components/AnimatedBackground';
import { projects } from './constants/projects';
import ProjectCard from './components/ProjectCard';
import PrivateInbox from './components/PrivateInbox';
import ThemeCustomizer from './components/ThemeCustomizer';
import TerminalConsole from './components/TerminalConsole';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState('portfolio'); // 'portfolio' or 'inbox'

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/messages-secret') {
        setView('inbox');
      } else {
        setView('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Dev' },
    { id: 'mobile', name: 'Mobile Apps' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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

  const handleDownloadCV = () => {
    const pdfUrl = `${process.env.PUBLIC_URL}/CV.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'CV Abderrahman Salmi.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (view === 'inbox') {
    return <PrivateInbox />;
  }

  return (
    <div className="min-h-screen bg-secondary text-gray-100">
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator" style={{ width: scrollProgress }} />

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-black tracking-tight cursor-pointer">
                <span className="text-primary font-bold">Salmi</span>
                <span className="text-gray-300">.</span>
                <span className="text-accent font-semibold text-lg">Dev</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
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
          <div className="md:hidden glass-effect px-4 pt-2 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                smooth={true}
                duration={500}
                className="cursor-pointer block px-3 py-2.5 rounded-lg text-base font-semibold text-gray-300 hover:text-primary hover:bg-white/5 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-20 lg:py-0">
        <AnimatedBackground variant="hero" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-mesh opacity-25 animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/15 to-transparent opacity-25 animate-spin-slow" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Profile Picture */}
            <div className="lg:flex-shrink-0 animate-float relative group">
              {/* Pulsing ring outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-md opacity-35 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 animate-pulse-slow" />
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover:scale-105 transition-all duration-500 animate-morph">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.jpg`}
                  alt="Salmi Abderrahman"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=SA';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 animate-fade-in tracking-tight leading-none text-white">
                <span className="gradient-text glitch animate-slide-up" data-text="Hello, I'm">Hello, I'm</span>
                <br />
                <span className="glow-text animate-slide-up text-5xl sm:text-7xl block mt-2" style={{ animationDelay: '0.2s' }}>Salmi Abderrahman</span>
              </h1>
              <p className="text-xl sm:text-2xl mb-4 text-gray-300 font-semibold animate-slide-up" style={{ animationDelay: '0.4s' }}>
                Mobile Developer & Robotics Specialist
              </p>
              <p className="text-base sm:text-lg mb-8 text-gray-400 max-w-2xl animate-slide-up leading-relaxed" style={{ animationDelay: '0.6s' }}>
                A versatile developer with a unique blend of mobile application development and robotics expertise. 
                I create innovative mobile solutions while exploring the fascinating world of robotics and automation. 
                My passion lies in bridging the gap between software and hardware, bringing creative ideas to life through both mobile apps and robotic systems.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <Link
                  to="projects"
                  smooth={true}
                  duration={500}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/95 hover:to-accent/95 text-white font-bold transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                >
                  View My Work
                </Link>
                
                <button
                  onClick={handleDownloadCV}
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  Download CV
                </button>

                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/salmi-abderrahman-1b296528a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-gray-300 font-bold group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/zenitsudono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.48C19.138 20.167 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span className="text-gray-300 font-bold group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Mouse Scroll Prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10">
          <Link to="projects" smooth={true} duration={500} className="flex flex-col items-center gap-2 group">
            <span className="text-[10px] text-gray-500 tracking-[0.2em] font-bold uppercase transition-colors group-hover:text-white">Scroll Down</span>
            <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center p-1 group-hover:border-primary transition-all duration-300">
              <div className="w-1 h-2 rounded-full bg-primary animate-scroll" />
            </div>
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text glow-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto text-sm leading-relaxed">
            Discover a showcase of my applications, hardware solutions, and engineering projects filtered by category.
          </p>

          {/* Categories selector pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-105 border-transparent'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* CV Section */}
      <section id="cv" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text glow-text">Resume & Journey</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Education Column */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
                <AcademicCapIcon className="h-7 w-7 text-primary" /> Education
              </h3>
              <div className="space-y-8 relative">
                {/* Timeline vertical connector */}
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/30 to-indigo-500/10" />

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">ÉCOLE MAROCAINE DES SCIENCES DE L’INGÉNIEUR (EMSI)</h4>
                  <p className="text-gray-300 text-sm mt-1">Génie Informatique et Réseaux</p>
                  <p className="text-gray-400 text-xs mt-0.5">1ère année d'études d'ingénieur</p>
                  <p className="text-xs text-primary font-semibold mt-2 px-2 py-0.5 bg-primary/10 rounded-full inline-block">2025 - Présent (En cours)</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-primary/50 ring-4 ring-primary/10 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">CITÉ DES MÉTIERS ET DES COMPÉTENCES (CMC)</h4>
                  <p className="text-gray-300 text-sm mt-1">Développement d'Applications Mobiles</p>
                  <p className="text-gray-400 text-xs mt-0.5">Spécialisation en conception et déploiement natif & hybride</p>
                  <p className="text-xs text-gray-400 font-semibold mt-2 px-2 py-0.5 bg-white/5 rounded-full inline-block">2023 - 2025</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-primary/40 ring-4 ring-primary/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">LKHIBRA ACADEMY</h4>
                  <p className="text-gray-300 text-sm mt-1">Python Programming & Soft-Skills</p>
                  <p className="text-xs text-gray-500 mt-2">2023</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-primary/30 ring-4 ring-primary/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">ARD ESSALAM 2</h4>
                  <p className="text-gray-300 text-sm mt-1">Baccalauréat Sciences Physiques</p>
                  <p className="text-xs text-gray-500 mt-2">2022</p>
                </div>
              </div>
            </div>

            {/* Development Column */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-accent/30 transition-all duration-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
                <CodeBracketIcon className="h-7 w-7 text-accent" /> Dev & Experience
              </h3>
              <div className="space-y-6 relative">
                {/* Timeline vertical connector */}
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent/30 to-purple-500/10" />

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">Stage chez MEGADev</h4>
                  <p className="text-gray-400 text-xs mt-1">Conception et codage de solutions logicielles professionnelles</p>
                  <p className="text-xs text-accent font-semibold mt-2 px-2 py-0.5 bg-accent/10 rounded-full inline-block">14/04/2025 - 09/05/2025</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-accent/70 ring-4 ring-accent/10 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">Projet Gestflow</h4>
                  <p className="text-gray-400 text-xs mt-1">Application de gestion et suivi de réclamations clients</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['Python', 'Django', 'SQLite', 'Bootstrap'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-accent/50 ring-4 ring-accent/10 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">Projet GMAO MACHINE</h4>
                  <p className="text-gray-400 text-xs mt-1">Gestion de Maintenance Assistée par Ordinateur</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-accent/40 ring-4 ring-accent/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">Projet Compteur de Taxi</h4>
                  <p className="text-gray-400 text-xs mt-1">Calculateur de tarifs GPS mobile en temps réel</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['Kotlin', 'XML', 'Maps API'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-accent/30 ring-4 ring-accent/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">Projet Kasbah Kitchen</h4>
                  <p className="text-gray-400 text-xs mt-1">Catalogue interactif de recettes culinaires</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['SQL', 'PHP', 'HTML5', 'JS'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Robotics & Awards Column */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
                <CpuChipIcon className="h-7 w-7 text-yellow-400" /> Robotics & Awards
              </h3>
              <div className="space-y-6 relative">
                {/* Timeline vertical connector */}
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-yellow-500/30 to-amber-500/10" />

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-yellow-400/20 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 leading-tight">1er Prix - ERC Robotique</h4>
                    <TrophyIcon className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Compétition Nationale ERC à EMSI Rabat</p>
                  <p className="text-xs text-yellow-400 font-semibold mt-1">2026</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-yellow-400/80 ring-4 ring-yellow-400/10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 leading-tight">Meilleure Innovation</h4>
                    <TrophyIcon className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Robotics Competition à FPSB El Jadida</p>
                  <p className="text-xs text-yellow-400 font-semibold mt-1">2026</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-yellow-500/60 ring-4 ring-yellow-500/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">Deathring Tunisie</h4>
                  <p className="text-gray-400 text-xs mt-1">Participation à la compétition internationale de robotique</p>
                  <p className="text-xs text-gray-500 mt-1">2025</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-yellow-500/40 ring-4 ring-yellow-500/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 leading-tight">Compétition Nationale FSR</h4>
                  <p className="text-gray-400 text-xs mt-1">1er Prix (Suiveur de ligne et capteurs couleurs)</p>
                  <p className="text-xs text-gray-500 mt-1">2023</p>
                </div>

                <div className="relative pl-8 group hover:bg-white/5 p-3 rounded-lg -ml-3 transition-colors duration-300">
                  <span className="absolute left-0 top-[18px] w-3 h-3 rounded-full bg-yellow-500/30 ring-4 ring-yellow-500/5 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">Journée ENSAJ</h4>
                  <p className="text-gray-400 text-xs mt-1">Suivi de ligne & évitement d'obstacles</p>
                  <p className="text-xs text-gray-500 mt-1">2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Section - Custom Pill Cards */}
          <div className="mt-12 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-xl max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
              <GlobeAltIcon className="h-7 w-7 text-primary" /> Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/35 hover:bg-white/10 transition-all duration-300 flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">ARABE</h4>
                  <p className="text-xs text-gray-400 mt-1">Langue Maternelle</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 border border-green-500/20 text-green-400">Native</span>
              </div>
              
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/35 hover:bg-white/10 transition-all duration-300 flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">FRANÇAIS</h4>
                  <p className="text-xs text-gray-400 mt-1">Maîtrise Professionnelle</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">Fluent</span>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/35 hover:bg-white/10 transition-all duration-300 flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">ANGLAIS</h4>
                  <p className="text-xs text-gray-400 mt-1">Niveau Intermédiaire</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Intermediate</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={handleDownloadCV}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-accent text-white font-bold transform hover:scale-105 hover:shadow-lg hover:shadow-primary/35 transition-all duration-300 cursor-pointer"
            >
              Download Full Resume PDF
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text glow-text">Get In Touch</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact details sidebar (2 cols) */}
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Let's build something together!</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Feel free to reach out for collaborations, project inquiries, or just to chat about software engineering, mobile development, or robotics!
                </p>
              </div>

              <div className="space-y-4">
                {/* Email card */}
                <a 
                  href="mailto:salmi05abd@gmail.com"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</span>
                    <h4 className="text-base font-semibold text-white mt-0.5 group-hover:text-primary transition-colors">salmi05abd@gmail.com</h4>
                  </div>
                </a>

                {/* Phone card */}
                <a 
                  href="tel:+212606321722"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.183-4.163-6.985-6.985l1.293-.97c.362-.271.528-.732.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone</span>
                    <h4 className="text-base font-semibold text-white mt-0.5 group-hover:text-accent transition-colors">+(212) 606321722</h4>
                  </div>
                </a>

                {/* Location card */}
                <div 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</span>
                    <h4 className="text-base font-semibold text-white mt-0.5 group-hover:text-yellow-400 transition-colors">Hay Karima, Salé, Maroc</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container (3 cols) */}
            <div className="lg:col-span-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 bg-black border-t border-white/5">
        <p>© 2026 Salmi Abderrahman. All rights reserved.</p>
      </footer>

      {/* Theme Customizer & Developer Terminal Console */}
      <ThemeCustomizer />
      <TerminalConsole />
    </div>
  );
}

export default App;
