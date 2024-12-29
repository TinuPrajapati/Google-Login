/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Playfair:["Playfair Display", "serif"],
        Nuntio:["Roboto Slab", "system-ui"],
        Lora:[ "Lora", "system-ui"]
      },
      colors:{
        custom:"#F5F5F5",
        custom2:"#B4A56F",
        custom3:"#F3F0E7",
      }
    },
  },
  plugins: [],
}