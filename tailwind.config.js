/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary)',
          dark: '#e56b10'
        },
        text: {
          DEFAULT: 'var(--color-text)',
          light: '#1e88c7',
          dark: '#064e70'
        },
        background: 'var(--color-bg)',
        gray: {
          DEFAULT: 'var(--color-gray)',
          light: '#6b7280',
          dark: '#374151'
        }
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
