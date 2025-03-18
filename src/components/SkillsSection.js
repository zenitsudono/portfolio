import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import AnimatedBackground from './AnimatedBackground';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { 
        name: 'HTML5',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        color: 'text-orange-500'
      },
      { 
        name: 'CSS3',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        color: 'text-blue-400'
      },
      { 
        name: 'JavaScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        color: 'text-yellow-400'
      },
      { 
        name: 'React',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        color: 'text-cyan-400'
      },
      { 
        name: 'Bootstrap',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
        color: 'text-purple-500'
      },
      { 
        name: 'XML',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg',
        color: 'text-orange-600'
      },
      { 
        name: 'Flutter',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        color: 'text-blue-400'
      },
      { 
        name: 'Dart',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
        color: 'text-blue-500'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      { 
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        color: 'text-blue-500'
      },
      { 
        name: 'Node.js',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        color: 'text-green-500'
      },
      { 
        name: 'MySQL',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        color: 'text-blue-600'
      },
      { 
        name: 'PHP',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
        color: 'text-indigo-400'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    skills: [
      { 
        name: 'GitHub',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        color: 'text-gray-400'
      },
      { 
        name: 'VS Code',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        color: 'text-blue-500'
      },
      { 
        name: 'Linux',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
        color: 'text-yellow-500'
      },
      { 
        name: 'Figma',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        color: 'text-purple-400'
      },
      { 
        name: 'Android Studio',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
        color: 'text-green-500'
      },
      { 
        name: 'PyCharm',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg',
        color: 'text-green-400'
      },
      { 
        name: 'IntelliJ IDEA',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
        color: 'text-red-500'
      }
    ]
  },
  {
    id: 'other',
    title: 'Robotics & Programming',
    skills: [
      { 
        name: 'Arduino',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
        color: 'text-teal-500'
      },
      { 
        name: 'C++',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        color: 'text-blue-600'
      },
      { 
        name: 'C',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
        color: 'text-blue-500'
      },
      { 
        name: 'Kotlin',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
        color: 'text-purple-500'
      },
      {
        name: 'Jetpack Compose',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetpackcompose/jetpackcompose-original.svg',
        color: 'text-green-500'
      }
    ]
  }
];

const SkillsSection = () => {
  const [skillsRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(category => category.id === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      <AnimatedBackground variant="skills" />
      <div ref={skillsRef} className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
          Skills & Expertise
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-sm
              ${selectedCategory === 'all' 
                ? 'bg-primary/20 text-white ring-2 ring-primary/50' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
          >
            All Skills
          </button>
          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-sm
                ${selectedCategory === category.id 
                  ? 'bg-primary/20 text-white ring-2 ring-primary/50' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transform transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${categoryIndex * 200}ms`,
              }}
            >
              <div className="bg-gray-900/30 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-6 text-gray-200">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
