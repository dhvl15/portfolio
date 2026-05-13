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
        background: '#0a0a0a',
        surface: '#141414',
        surface2: '#1a1a1a',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        text: '#e5e5e5',
        textMuted: '#a3a3a3',
        border: '#262626',
      },
    },
  },
  plugins: [],
}
