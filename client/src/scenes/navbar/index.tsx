import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard"); // State to keep track of selected navigation item

  return (
    <>
      <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        {/* Left side of the navbar: Branding */}
        <FlexBetween gap="0.4rem">
          <AccountBalanceSharpIcon sx={{ fontSize: "28px" }} /> {/* Account icon */}
          <Typography variant="h4" fontSize="16px">
            Finanseer
          </Typography>
        </FlexBetween>

        {/* Right side of the navbar: Links */}
        <FlexBetween gap="2rem">
          {/* Dashboard Link */}
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")} // Set "dashboard" as selected when clicked
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700], // Highlight selected link
                textDecoration: "inherit", // Remove underline from the link
              }}
            >
              dashboard
            </Link>
          </Box>

          {/* Predictions Link */}
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/predictions"
              onClick={() => setSelected("predictions")} // Set "predictions" as selected when clicked
              style={{
                color: selected === "predictions" ? "inherit" : palette.grey[700], // Highlight selected link
                textDecoration: "inherit", // Remove underline from the link
              }}
            >
              predictions
            </Link>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
