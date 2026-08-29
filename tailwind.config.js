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
        bg: {
          base: '#050505',
          surface: '#080808',
          card: '#0D0D0D',
          elevated: '#141414',
        },
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#E6C65C',
          soft: '#AA8C2C',
          dark: '#856A1C',
        },
        accent: {
          blue: '#1683FF',
        },
        text: {
          main: '#FFFFFF',
          sub: '#D4D4D4',
          muted: '#8A8A8A',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'border-gold': 'rgba(212, 175, 55, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'container': '20px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'card-hover': '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.08)',
        'gold-btn': '0 4px 20px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}