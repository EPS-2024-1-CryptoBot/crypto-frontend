/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#92CE76",
        secondary: "#10597F",
        tertiary: "#E0C132",
      },
    },
  },
  plugins: [],
}

