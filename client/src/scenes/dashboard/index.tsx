import { Box, useTheme } from '@mui/material'

// template literals for grid layout
const gridTemplate = `
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
`

const Dashboard = (props: Props) => {
  const { palette } = useTheme()
  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
    sx={{
      // Minmax is used to make the grid responsive and 370px is the minimum width, never less than that
      gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
      // Minmax is used to make the grid responsive and 60px (per unit - 10 totally) is the minimum height, never less than that
      gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
      // Uses the gridTemplate variable above to define the grid layout (a to j)
      gridTemplateAreas: gridTemplate,
    }}
    >
      <Box bgcolor="#fff" gridArea="a"></Box>
      <Box bgcolor="#fff" gridArea="b"></Box>
      <Box bgcolor="#fff" gridArea="c"></Box>
      <Box bgcolor="#fff" gridArea="d"></Box>
      <Box bgcolor="#fff" gridArea="e"></Box>
      <Box bgcolor="#fff" gridArea="f"></Box>
      <Box bgcolor="#fff" gridArea="g"></Box>
      <Box bgcolor="#fff" gridArea="h"></Box>
      <Box bgcolor="#fff" gridArea="i"></Box>
      <Box bgcolor="#fff" gridArea="j"></Box>
    </Box>
  )
}
export default Dashboard