module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#007bff", // Ejemplo de extensión de colores
      },
      fontFamily: {
        "custom-sans": ["Montserrat", "sans-serif"], // Ejemplo de extensión de familias de fuentes
      },
    },
  },
  plugins: [
    require("postcss-preset-env"),
    require("postcss-flexbugs-fixes"),
    // Otros plugins que puedas tener...
  ],
};
