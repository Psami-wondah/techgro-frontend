/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
        rubik: ["Rubik"],
        lato: ["Lato"],
        poppins: ["Poppins"],
      },
      colors: {
        "techgro-green": "#81E291",
        "techgro-dark": "#00242C",
        "techgro-orange": "rgb(249, 157, 64)",
      },
      // backgroundImage: {
      //   "techgro-home": "url('/svgs/home.svg')",
      // },
      // backgroundSize: {
      //   "techgro-home": "20%",
      // },
      // backgroundPosition: {
      //   "techgro-home": "5% 50%",
      // },
    },
  },
  plugins: [],
};
