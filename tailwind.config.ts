import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        bg: '#0B0B0B',
        primary: '#FF6A00',
        secondary: '#A3FF12',
        tertiary: '#00C2FF',
        accent: '#6C5CE7',
        surface: {
          DEFAULT: '#111111',
          2: '#141414',
        },
        border: {
          subtle: '#1F1F1F',
        },
        text: {
          primary: '#F5F5F5',
          muted: '#888888',
        },
      },
      fontFamily: {
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 106, 0, 0.25)',
        'glow-orange-lg': '0 0 40px rgba(255, 106, 0, 0.35)',
        'glow-lime': '0 0 20px rgba(163, 255, 18, 0.25)',
        'glow-cyan': '0 0 20px rgba(0, 194, 255, 0.25)',
        'glow-purple': '0 0 20px rgba(108, 92, 231, 0.25)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-orange-radial': 'radial-gradient(ellipse at center, rgba(255,106,0,0.15) 0%, transparent 70%)',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        blob: 'blob 10s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 106, 0, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 106, 0, 0.45)' },
        },
        blob: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(30px, -40px) scale(1.06)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.94)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
      },
      screens: {
        xs: '375px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
