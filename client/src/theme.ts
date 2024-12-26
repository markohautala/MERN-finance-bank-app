// design tokens and hue settings for the theme

export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    50: "#abc4ff",
    100: "#c1d3fe",
    200: "#ccdbfd",
    300: "#d7e3fc",
    400: "#edf2fa",
    500: "#edf2fa",  // Assuming the main color will be the lightest shade
    600: "#d7e3fc",
    700: "#ccdbfd",
    800: "#c1d3fe",
    900: "#abc4ff", // Using the darkest shade as the main color
  },
  secondary: {
    100: "#B9F3FC", // Replaced with #B9F3FC
    200: "#B9F3FC", // Replaced with #B9F3FC
    300: "#B9F3FC", // Replaced with #B9F3FC
    400: "#B9F3FC", // Replaced with #B9F3FC
    500: "#B9F3FC", // Replaced with #B9F3FC
    600: "#B9F3FC", // Replaced with #B9F3FC
    700: "#B9F3FC", // Replaced with #B9F3FC
    800: "#B9F3FC", // Replaced with #B9F3FC
    900: "#B9F3FC", // Replaced with #B9F3FC
  },
  tertiary: {
    500: "#B9F3FC",  // Replaced purple color with #B9F3FC
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

// gets the hue value from the tokens
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,  // spread operator to get all the values
      main: tokens.primary[50],  // Set the main color to #abc4ff (the darkest)
      light: tokens.primary[400],  // Now the light color will be #edf2fa
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};
