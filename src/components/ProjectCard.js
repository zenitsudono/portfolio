import React from 'react';

const ProjectCard = ({ title, description, image, technologies, liveLink, githubLink }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700/50">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 hover:border-primary/40 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 mt-auto">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <span>Live Demo</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg border border-gray-600 hover:border-primary text-gray-300 hover:text-primary font-medium transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative corner gradients */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full" />
    </div>
  );
};

export default ProjectCard;
