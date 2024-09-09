import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react"
import { themeSettings } from "./theme";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return <div className='app'>
    <ThemeProvider theme={theme}> {/* applies the theme to the app */}
      <CssBaseline />  {/* resets the default styles */}
      <h1>Hi!</h1>
    </ThemeProvider>
  </div>;
}

export default App
