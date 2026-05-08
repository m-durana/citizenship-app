/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0e10",
        panel: "#15171c",
        border: "#222730",
        ink: "#f3f4f6",
        muted: "#8a93a6",
        accent: "#c44a64",        // burgundy rose (primary action color)
        gold: "#e9c46a",
        burgundy: "#5a1822",
        "burgundy-2": "#3d101a",
        "burgundy-hi": "#7a2231",
        likely: "#3ddc97",
        possibly: "#ffc857",
        unlikely: "#7a7f8a",
      },
      fontFamily: {
        sans: ['"Nunito Sans"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
