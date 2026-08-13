/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: {
          950: '#050505', // Main Background
          900: '#0A0A0A', // Secondary Background
          800: '#111111', // Card Background
          750: '#151515', // Card Hover
          700: '#171717', // Elevated Surface
          600: '#262626', // Border
          500: '#333333', // Secondary Border
        },
        gold: {
          600: '#B8860B', // Metallic Deep Gold
          500: '#D4AF37', // Primary Gold
          400: '#F5D76E', // Bright Gold (hover/active)
          300: '#FFE7A3', // Light Gold
          200: '#FFF1C8',
        },
        gray: {
          400: '#B3B3B3', // Secondary Text
          500: '#737373', // Muted Text
          600: '#525252',
          700: '#404040',
        },
        // Backward compatibility & semantic mappings
        midnight: {
          950: '#050505',
          900: '#0A0A0A',
          850: '#0E0E0E',
          800: '#111111',
          750: '#151515',
          700: '#262626',
          600: '#333333',
          500: '#737373',
          400: '#B3B3B3',
        },
        primary: {
          50: '#FFFBF0',
          100: '#FFF1C8',
          200: '#FFE7A3',
          300: '#F5D76E',
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#946B08',
          800: '#705106',
          900: '#4C3704',
        },
        dark: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#B3B3B3',
          400: '#737373',
          500: '#525252',
          600: '#333333',
          700: '#262626',
          800: '#111111',
          900: '#0A0A0A',
          950: '#050505',
        },
        ivory: '#FFFFFF',
        warmgray: {
          DEFAULT: '#B3B3B3',
          400: '#B3B3B3',
          500: '#737373',
          600: '#525252',
        },
        status: {
          success: '#4ADE80',
          error: '#F87171',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'gold-subtle': '0 0 20px rgba(212, 175, 55, 0.05)',
        'gold-medium': '0 0 35px rgba(212, 175, 55, 0.08)',
        'gold-card': '0 0 35px rgba(212, 175, 55, 0.06)',
        'gold-featured': '0 0 50px rgba(212, 175, 55, 0.12)',
        'gold-cta': '0 8px 30px rgba(212, 175, 55, 0.18)',
        'gold-node': '0 0 12px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-fade-in',
    'animate-slide-up',
    'animate-slide-in-right',
    'animate-pulse-slow',
    'animate-float',
    'animate-typing',
  ],
}