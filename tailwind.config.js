/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#0F172A',
        accent: '#F43F5E',
        'gradient-start': '#6366F1',
        'gradient-mid': '#8B5CF6',
        'gradient-end': '#EC4899',
        'neon': '#00FF94',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wave': 'wave 2.5s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 70, 229, 0.8)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(100px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideRight: {
          '0%': {
            transform: 'translateX(-100px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        scale: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        neonPulse: {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1) drop-shadow(0 0 10px #00FF94)',
          },
          '50%': {
            opacity: '0.6',
            filter: 'brightness(0.8) drop-shadow(0 0 5px #00FF94)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, rgba(79, 70, 229, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(79, 70, 229, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(79, 70, 229, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(79, 70, 229, 0.1) 75%)',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.neon"), 0 0 20px theme("colors.neon")',
        'neon-strong': '0 0 5px theme("colors.neon"), 0 0 20px theme("colors.neon"), 0 0 40px theme("colors.neon")',
        'inner-glow': 'inset 0 0 20px rgba(99, 102, 241, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
