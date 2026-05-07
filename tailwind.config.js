/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10",
        panel: "#14171c",
        border: "#222730",
        ink: "#e8eaee",
        muted: "#8a93a6",
        accent: "#7cc5ff",
        likely: "#3ddc97",
        possibly: "#ffc857",
        unlikely: "#7a7f8a",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
    },
  },
  plugins: [],
};
