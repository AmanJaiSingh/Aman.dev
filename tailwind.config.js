/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#07070d',
          darker: '#050509',
          card: '#0e0e1a',
          accent: '#00f0ff',
          'accent-dim': '#00c8d4',
          secondary: '#ff003c',
          purple: '#b026ff',
          'purple-dim': '#8c1fd4',
          gold: '#ffd700',
          glass: 'rgba(14,14,26,0.7)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,240,255,0.4)',
        'neon-purple': '0 0 20px rgba(176,38,255,0.4)',
        'neon-red': '0 0 20px rgba(255,0,60,0.4)',
        'glass': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,240,255,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(0,240,255,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
