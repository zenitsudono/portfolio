import React from 'react';
import { Link } from 'react-scroll';
import AnimatedBackground from './AnimatedBackground';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground variant="hero" />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 to-transparent opacity-20 animate-spin-slow" />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Salmi Abderrahman
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Full Stack Developer | Mobile Developer
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            View My Work
          </Link>
          <a
            href="/CV.pdf"
            download="CV Abderrahman Salmi.pdf"
            className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
