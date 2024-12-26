import React from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link
                to="skills"
                smooth={true}
                duration={500}
                className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Skills
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
