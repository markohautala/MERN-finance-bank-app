import { Box, CssBaseline, dividerClasses, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react"
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@scenes/navbar";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return <div className='app'>
    <BrowserRouter>  {/* enables routing */}
      <ThemeProvider theme={theme}> {/* applies the theme to the app */}
        <CssBaseline />  {/* resets the default styles */}
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<div>dashboard</div>} />
            <Route path="/predictions" element={<div>predictions</div>} />
          </Routes>
        </Box> {/* the rest of the app goes here */}
      </ThemeProvider>
    </BrowserRouter>
  </div>;
}

export default App
