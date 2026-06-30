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
      },
      {
        name: 'Django',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
        color: 'text-emerald-700'
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
      },
      {
        name: 'Java',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        color: 'text-red-500'
      }

    ]
  }
];

const getBrandColor = (colorClass) => {
  const mapping = {
    'text-orange-500': '#f97316',
    'text-blue-400': '#60a5fa',
    'text-yellow-400': '#facc15',
    'text-cyan-400': '#22d3ee',
    'text-purple-500': '#a855f7',
    'text-orange-600': '#ea580c',
    'text-blue-500': '#3b82f6',
    'text-green-500': '#22c55e',
    'text-blue-600': '#2563eb',
    'text-indigo-400': '#818cf8',
    'text-emerald-700': '#10b981',
    'text-red-500': '#ef4444',
    'text-gray-400': '#9ca3af',
    'text-yellow-500': '#eab308',
    'text-purple-400': '#c084fc',
    'text-green-400': '#4ade80',
    'text-teal-500': '#14b8a6',
  };
  return mapping[colorClass] || '#6366f1';
};

const SkillsSection = () => {
  const [skillsRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

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

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
              selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-105 border-transparent' 
                : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'}`}
          >
            All Skills
          </button>
          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-105 border-transparent' 
                  : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'}`}
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
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/35 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.skills.map((skill, index) => {
                    const isHovered = hoveredSkill === skill.name;
                    const brandColor = getBrandColor(skill.color);
                    
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer border"
                        style={{
                          borderColor: isHovered ? brandColor : 'rgba(255, 255, 255, 0.05)',
                          backgroundColor: isHovered ? `${brandColor}0d` : 'rgba(255, 255, 255, 0.02)',
                          boxShadow: isHovered ? `0 10px 20px -5px ${brandColor}25, 0 4px 6px -4px ${brandColor}15` : 'none'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border"
                          style={{
                            borderColor: isHovered ? brandColor : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isHovered ? `${brandColor}1a` : 'rgba(255, 255, 255, 0.04)',
                            boxShadow: isHovered ? `inset 0 0 10px ${brandColor}1a` : 'none'
                          }}
                        >
                          <img 
                            src={skill.logo} 
                            alt={skill.name}
                            className="w-8 h-8 object-contain transition-all duration-500"
                            style={{
                              filter: isHovered ? `drop-shadow(0 0 8px ${brandColor})` : 'drop-shadow(0 0 2px rgba(255,255,255,0.15))'
                            }}
                          />
                        </div>
                        <span 
                          className="text-sm font-semibold transition-colors duration-300 leading-tight"
                          style={{
                            color: isHovered ? brandColor : '#d1d5db'
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
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
