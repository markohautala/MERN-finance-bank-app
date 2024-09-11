import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <>
      <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        {/* Left side of the navbar */}
        <FlexBetween gap="0.75rem">
          <AccountBalanceSharpIcon sx={{ fontsize: "28px" }} />
          <Typography variant="h4" fontSize="18px">
            Finanseer
          </Typography>
        </FlexBetween>

        {/* Right side of the navbar */}
        <FlexBetween gap="2rem">
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link  // React router dom link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit"
               }}>  {/* cannot use sx because react element, not MUI element. Get hue 100 if selected, if not selected, get hue 700 */}
              dashboard
            </Link>
          </Box>
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link  // React router dom link
              to="/predictions"
              onClick={() => setSelected("predictions")}
              style={{
                color: selected === "predictions" ? "inherit" : palette.grey[700],
                textDecoration: "inherit"
               }}>  {/* cannot use sx because react element, not MUI element. Get hue 100 if selected, if not selected, get hue 700 */}
              predictions
            </Link>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
