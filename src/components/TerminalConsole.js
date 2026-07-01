import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../constants/projects';

const HELP_TEXT = [
  'Available Commands:',
  '  about     - Learn more about Salmi Abderrahman',
  '  skills    - Print tech stack & expertise summary',
  '  projects  - List Web and Mobile applications',
  '  secret    - Reveal a hidden portal hint',
  '  matrix    - Toggle retro falling code animation',
  '  clear     - Clear the terminal console output',
  '  help      - Show this commands helper documentation'
];

const ABOUT_TEXT = [
  'Name: Salmi Abderrahman',
  'Role: Full Stack Software Engineer, Mobile & Robotics Enthusiast',
  'Location: Salé, Morocco',
  'Interests: Web development (React/Django), Mobile (Flutter), Robotics',
  'Bio: Creative engineer passionate about building high-fidelity clean interfaces and automated robotic hardware.'
];

const SKILLS_TEXT = [
  'Tech Stack Summary:',
  '  [Frontend] - React, HTML5, CSS3, JavaScript, Tailwind, Bootstrap, Dart',
  '  [Backend]  - Python, Django, Node.js, PHP, MySQL, SQLite',
  '  [Robotics] - Arduino, C, C++, Kotlin, Jetpack Compose, Java'
];

const TerminalConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    'Welcome to Salmi.Dev CLI Console [Version 1.0.0]',
    'Type "help" to view list of interactive commands.',
    ''
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Matrix screensaver animation handler
  useEffect(() => {
    if (!isMatrixMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const columns = Math.floor(canvas.width / 14);
    const drops = Array(columns).fill(1);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$&@#'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF94';
      ctx.font = '12px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, drops[i] * 14);

        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixMode, isOpen]);

  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    const newHistory = [...history, `visitor@salmi-dev:~$ ${cmdText}`];

    if (cleanCmd === '') {
      setHistory(newHistory);
      return;
    }

    switch (cleanCmd) {
      case 'clear':
        setHistory([]);
        return;
      case 'help':
        newHistory.push(...HELP_TEXT);
        break;
      case 'about':
        newHistory.push(...ABOUT_TEXT);
        break;
      case 'skills':
        newHistory.push(...SKILLS_TEXT);
        break;
      case 'projects':
        newHistory.push('Featured Projects list:');
        projects.forEach((p) => {
          newHistory.push(`  - ${p.title} (${p.category}): ${p.githubLink}`);
        });
        break;
      case 'secret':
        newHistory.push(
          '🔑 DECRYPTED PORTAL:',
          '  Shh! Visit the URL path: /#/messages-secret to check my private inbox log!'
        );
        break;
      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        newHistory.push(isMatrixMode ? 'Matrix screensaver deactivated.' : 'Matrix screensaver activated! Type "matrix" again to exit.');
        break;
      default:
        newHistory.push(`command not found: ${cleanCmd}. Type "help" for instructions.`);
    }

    newHistory.push('');
    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div className="fixed left-5 bottom-5 z-50">
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-black/80 border border-white/10 hover:border-primary/50 text-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer font-mono font-bold text-lg"
          title="Open Terminal Console"
        >
          &gt;_
        </button>
      )}

      {/* Terminal window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[480px] h-[340px] bg-black/90 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-md animate-fade-in font-mono text-xs text-gray-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="font-bold text-gray-400 ml-1 text-[10px] uppercase tracking-wider">Salmi.Dev // CLI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white transition-colors cursor-pointer text-base leading-none font-bold"
              title="Minimize Console"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="relative flex-1 p-4 overflow-y-auto min-h-0 space-y-1 select-text" ref={bodyRef}>
            {isMatrixMode && (
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              />
            )}
            
            {history.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed break-all">
                {line}
              </div>
            ))}

            {/* Input field */}
            <div className="flex items-center gap-1.5 pt-1.5">
              <span className="text-primary flex-shrink-0">visitor@salmi-dev:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-white font-mono"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalConsole;
