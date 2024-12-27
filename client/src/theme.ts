// design tokens and hue settings for the theme

export const tokens = {
  grey: {
    100: "#f0f0f3", // Lightest grey
    200: "#e1e2e7", // Light grey
    300: "#d1d3da", // Light-medium grey
    400: "#c2c5ce", // Medium grey
    500: "#b3b6c2", // Base grey (neutral)
    600: "#8f929b", // Darker grey
    700: "#6b6d74", // Even darker grey
    800: "#48494e", // Very dark grey
    900: "#242427", // Darkest grey
  },
  primary: {
    50: "#abc4ff",  // Lightest blue
    100: "#c1d3fe", // Light blue
    200: "#ccdbfd", // Medium light blue
    300: "#d7e3fc", // Medium blue
    400: "#edf2fa", // Lighter blue
    500: "#edf2fa",  // Main color (lighter shade)
    600: "#d7e3fc", // Slightly darker blue
    700: "#ccdbfd", // Darker blue
    800: "#c1d3fe", // Even darker blue
    900: "#abc4ff", // Darkest blue (used as main)
  },
  secondary: {
    100: "#B9F3FC", // Light cyan
    200: "#B9F3FC", // Light cyan
    300: "#B9F3FC", // Light cyan
    400: "#B9F3FC", // Light cyan
    500: "#B9F3FC", // Main cyan
    600: "#B9F3FC", // Cyan
    700: "#B9F3FC", // Cyan
    800: "#B9F3FC", // Cyan
    900: "#B9F3FC", // Dark cyan
  },
  tertiary: {
    500: "#B9F3FC",  // Tertiary color (Cyan)
  },
  background: {
    light: "#2d2d34", // Light background color
    main: "#1f2026", // Main background color (dark)
  },
};

// gets the hue value from the tokens and applies them to the theme
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,  // Spread operator to get all primary shades
      main: tokens.primary[50],  // Set the main color to the lightest blue
      light: tokens.primary[400],  // Set the light color to a slightly lighter blue
    },
    secondary: {
      ...tokens.secondary,  // Spread operator to get all secondary shades
      main: tokens.secondary[500], // Use main cyan color for secondary
    },
    tertiary: {
      ...tokens.tertiary, // Use tertiary color
    },
    grey: {
      ...tokens.grey,  // Spread operator to get all grey shades
      main: tokens.grey[500],  // Set grey main color to neutral grey
    },
    background: {
      default: tokens.background.main,  // Set background default to main dark color
      light: tokens.background.light,   // Set background light to lighter dark color
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),  // Set font family to Inter
    fontSize: 12,  // Base font size
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 1 font family
      fontSize: 32,  // Font size for h1
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 2 font family
      fontSize: 24,  // Font size for h2
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 3 font family
      fontSize: 20,  // Font size for h3
      fontWeight: 800, // Bold font weight for h3
      color: tokens.grey[200], // Light grey color for h3
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 4 font family
      fontSize: 14,  // Font size for h4
      fontWeight: 600, // Medium font weight for h4
      color: tokens.grey[300], // Medium grey color for h4
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 5 font family
      fontSize: 12,  // Font size for h5
      fontWeight: 400, // Regular font weight for h5
      color: tokens.grey[500], // Base grey color for h5
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Heading 6 font family
      fontSize: 10,  // Font size for h6
      color: tokens.grey[700], // Dark grey color for h6
    },
  },
};
