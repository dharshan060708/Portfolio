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
          primary: '#050607',
          secondary: '#090A0C',
          card: '#0B0D0F',
          elevated: '#101215',
        },
        gold: {
          DEFAULT: '#D6A63A',
          bright: '#F2C45E',
          soft: '#B88A2E',
          dark: '#9E7420',
        },
        accent: {
          blue: '#1683FF',
          'blue-glow': 'rgba(22, 131, 255, 0.35)',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A7A7A7',
          muted: '#6F7378',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'border-gold': 'rgba(214, 166, 58, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'container': '20px',
        'btn': '10px',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(214, 166, 58, 0.12), inset 0 1px 0 rgba(214, 166, 58, 0.2)',
        'gold-btn': '0 4px 20px rgba(214, 166, 58, 0.28)',
        'blue-glow': '0 0 25px rgba(22, 131, 255, 0.4)',
      },
    },
  },
  plugins: [],
}