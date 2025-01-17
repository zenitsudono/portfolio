import React, { useState, useEffect } from 'react';
import { preloadImage } from '../utils/imageUtils';

const ProjectCard = ({ title, description, image, technologies, liveLink, githubLink }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    preloadImage(image)
      .then(() => setImageLoaded(true))
      .catch(() => setImageError(true));
  }, [image]);

  const handleImageError = () => {
    console.log(`Image failed to load for project: ${title}`);
    console.log(`Image path: ${image}`);
    setImageError(true);
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-700/50 hover:border-primary/50">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {!imageError && imageLoaded ? (
          <img 
            src={image} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:text-white border border-primary/20 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300"
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
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
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
              className="flex items-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transform hover:scale-105 transition-all duration-300 border border-gray-600 hover:border-gray-500"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              <span>View Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
