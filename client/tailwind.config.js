/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "transparent",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "green",
            borderRadius: "20px",
            border: "1px solid transparent",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
