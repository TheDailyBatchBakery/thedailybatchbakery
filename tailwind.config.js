/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7f2',
          100: '#f5ede0',
          200: '#ead9c1',
          300: '#d9a86c',
          400: '#c8975e',
          500: '#b18458',
          600: '#9a7149',
          700: '#7d5a3a',
          800: '#63472e',
          900: '#4a3623',
        },
      },
    },
  },
  plugins: [],
}

