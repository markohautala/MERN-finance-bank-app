import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react"
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);  // Create the theme using the theme settings

  return (
    <div className='app'>
      <BrowserRouter>  {/* Enables routing for the application */}
        <ThemeProvider theme={theme}> {/* Applies the created theme to the app */}
          <CssBaseline />  {/* Resets default styles to ensure consistent look across browsers */}
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />  {/* Navbar component which will be displayed on top of the app */}
            <Routes>  {/* Sets up routing for different pages */}
              <Route path="/" element={<Dashboard />} />  {/* The route for the dashboard page */}
              <Route path="/predictions" element={<Predictions />} />  {/* The route for the predictions page */}
            </Routes>
          </Box>  {/* The main content of the app will be inside this Box */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
