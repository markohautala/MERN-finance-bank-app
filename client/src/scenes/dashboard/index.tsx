// Import necessary components from Material UI and custom components
import { Box, useMediaQuery } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Space from './Space.tsx';

// Template literals for large and small screen grid layouts
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
  // Check if screen size is above medium (1200px)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"  // Full width
      height="100%"  // Full height
      display="grid"  // Use CSS grid layout
      gap="1.5rem"  // Space between grid items
      sx={{
        ...(isAboveMediumScreens ? {
          // Large screen layout (above 1200px)
          gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',  // 3 columns of equal width
          gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',  // 10 rows
          gridTemplateAreas: gridTemplateLargeScreens,  // Large screen grid template
        } : {
          // Small screen layout (below 1200px)
          gridAutoColumns: '1fr',  // Each column takes up equal space
          gridAutoRows: '80px',  // Set row height
          gridTemplateAreas: gridTemplateSmallScreens,  // Small screen grid template
        })
      }}
    >
      <Row1 />  {/* Row1 component */}
      <Row2 />  {/* Row2 component */}
      <Row3 />  {/* Row3 component */}
      <Space />  {/* Space component to add extra gap below Row3 */}
    </Box>
  );
};

export default Dashboard;
