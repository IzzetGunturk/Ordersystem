/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Parisienne: ['Parisienne', 'sans-serif'],
      },
      colors: {
        primary: '#E9E4C9',
        buttoncolor: '#202020'
      },
    },
  },
  plugins: [],
}