// Extending the default MUI Palette types to include a 'tertiary' color
declare module "@mui/material/styles/createPalette" {
  // Adding support for numeric keys (like 100, 200, etc.) in the PaletteColor interface
  interface PaletteColor {
    [key: number]: string;
  }

  // Adding a new 'tertiary' color to the Palette interface
  interface Palette {
    tertiary: PaletteColor; // 'tertiary' is now part of the palette and will be of type PaletteColor
  }
}
