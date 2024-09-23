import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

// template literals for grid layout
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
    sx={
      isAboveMediumScreens ? {
      // Minmax is used to make the grid responsive and 370px is the minimum width, never less than that
        gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
        // Minmax is used to make the grid responsive and 60px (per unit - 10 totally) is the minimum height, never less than that
        gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
        // Uses the gridTemplate variable above to define the grid layout (a to j)
        gridTemplateAreas: gridTemplateLargeScreens,
      } : {
        gridAutoColumns: '1fr', // 1fr is 1 fraction unit of the available space
        gridAutoRows: '80px', // 80px is the height of each row
        gridTemplateAreas: gridTemplateSmallScreens,
      }
    }>
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};
export default Dashboard;