import React, { useState, useEffect } from 'react';

const themes = [
  { id: 'plasma', name: 'Plasma Violet', primary: '#4F46E5', accent: '#F43F5E', bodyAttr: '' },
  { id: 'cyberpunk', name: 'Cyberpunk Pink', primary: '#EC4899', accent: '#06B6D4', bodyAttr: 'cyberpunk' },
  { id: 'matrix', name: 'Matrix Green', primary: '#22C55E', accent: '#16A34A', bodyAttr: 'matrix' },
  { id: 'ocean', name: 'Ocean Blue', primary: '#06B6D4', accent: '#3B82F6', bodyAttr: 'ocean' }
];

const ThemeCustomizer = () => {
  const [activeTheme, setActiveTheme] = useState('plasma');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      const savedTheme = localStorage.getItem('portfolio_theme') || 'plasma';
      setActiveTheme(savedTheme);
      const target = themes.find(t => t.id === savedTheme);
      if (target && target.bodyAttr) {
        document.body.setAttribute('data-theme', target.bodyAttr);
      } else {
        document.body.removeAttribute('data-theme');
      }
    };

    syncTheme();

    window.addEventListener('theme-changed', syncTheme);
    return () => window.removeEventListener('theme-changed', syncTheme);
  }, []);

  const handleSelectTheme = (theme) => {
    setActiveTheme(theme.id);
    localStorage.setItem('portfolio_theme', theme.id);
    if (theme.bodyAttr) {
      document.body.setAttribute('data-theme', theme.bodyAttr);
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  return (
    <div className="fixed right-5 bottom-24 z-50 flex items-center gap-3">
      {/* Theme selection panel */}
      {isOpen && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl animate-fade-in">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTheme(t)}
              title={t.name}
              className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer overflow-hidden ${
                activeTheme === t.id ? 'border-white scale-105 shadow-lg shadow-white/10' : 'border-white/10'
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.primary} 50%, ${t.accent} 50%)`
              }}
            >
              {activeTheme === t.id && (
                <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group"
        title="Customize Theme"
      >
        <svg className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.37a2.25 2.25 0 113.182 3.182l-9.37 9.37a4.5 4.5 0 01-2.24 1.32l-3.87 1.162a.75.75 0 01-.928-.928l1.162-3.87a4.5 4.5 0 011.32-2.24z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.967 15.033l1.83 1.83" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5l-9 9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5h6" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeCustomizer;
