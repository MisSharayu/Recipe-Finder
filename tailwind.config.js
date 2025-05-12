/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      display: ['responsive', '-ms-flex', '-ms-grid'],
      flex: ['responsive', '-ms-flex']
    }
  },
  theme: {
    extend: {
      colors: {
        olive: '#6B8E23',
        beige: '#FAF3E0',
        tomato: '#FF6347',
        mint: '#98FF98',
      },
      fontFamily: {
        forte: ["forte"],
      },
    },
  },
  plugins: [],
}