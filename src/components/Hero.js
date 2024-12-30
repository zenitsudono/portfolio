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

      {/* Profile Image - Top on mobile, hidden on desktop */}
      <div className="absolute md:hidden top-28 left-1/2 transform -translate-x-1/2 w-28 h-28 z-20">
        <img
          src="/logo.jpg"
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-lg animate-float"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse" />
      </div>

      {/* Desktop Profile Image */}
      <div className="hidden md:block absolute right-[15%] top-1/2 transform -translate-y-1/2 w-40 h-40 z-20">
        <img
          src="/logo.jpg"
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-lg animate-float"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 text-center mt-48 md:mt-0 px-4 sm:px-6 lg:px-8">
        <div className="mb-2 text-xl md:text-2xl text-gray-400">Hello, I'm</div>
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
