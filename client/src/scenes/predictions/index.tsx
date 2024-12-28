import { useGetKpisQuery } from "@/state/api";  // Import a custom hook to fetch data (KPI data)
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";  // Import UI components from Material UI
import { useMemo, useState } from "react";  // Import React hooks for state and memoization
import LoadingWrapper from "@/components/LoadingWrapper";  // Import a component to show a loading spinner
import DashboardBox from "@/components/DashboardBox";  // Import a box layout component for the dashboard
import Flexbetween from "@/components/FlexBetween";  // Import a custom component for flexible layout
import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
} from "recharts";  // Import chart components from Recharts to create a line chart
import regression, { DataPoint } from "regression";  // Import regression module for creating a regression line

const Predictions = () => {
  const { palette } = useTheme();  // Access the color palette from the theme
  const [isPredictions, setIsPredictions] = useState(false);  // Set up a state to toggle predictions visibility
  const { data: kpiData } = useGetKpisQuery();  // Fetch KPI data using the custom hook

  // Media query for screens 768px and below
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // Format the data to make it ready for the chart
  const formattedData = useMemo(() => {
    if (!kpiData) return [];  // If there's no data, return an empty array
    const monthData = kpiData[0].monthlyData;  // Grab monthly data from the KPI data

    // Prepare data for the regression line
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];  // Format as an array of [index, revenue]
      }
    );

    // Create a linear regression line from the data
    const regressionLine = regression.linear(formatted);

    // Create the final data to display, including actual, regression, and predicted revenues
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,  // Name of the month
        "Actual Revenue": revenue,  // Actual revenue for that month
        "Regression Line": regressionLine.points[i][1],  // Revenue value on the regression line
        "Predicted Revenue": regressionLine.predict(i + 12)[1],  // Predict revenue for the next 12 months
      };
    });
  }, [kpiData]);  // Recalculate when kpiData changes

  return (
    <DashboardBox
      width="100%"  // Make the box take up full width
      height="100%"  // Make the box take up full height
      p="1rem"  // Add padding around the box
      overflow="hidden"  // Hide anything that overflows the box
    >
      <LoadingWrapper>  {/* Show a loading spinner while data is being fetched */}
        <Flexbetween m={isSmallScreen ? "1rem" : "1rem 2.5rem"} gap="1rem" flexDirection={isSmallScreen ? "column" : "row"}>
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>  {/* Main title */}
            <Typography variant="h5">
              Charted revenue and predicted revenue based on a linear regression model
            </Typography>  {/* Subtitle explaining the chart */}
          </Box>
          <Button
            onClick={() => setIsPredictions(!isPredictions)}  // Toggle to show/hide predicted revenue
            sx={{
              color: palette.grey[900],  // Button text color
              backgroundColor: palette.grey[500],  // Button background color
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)",  // Button shadow effect
              marginTop: isSmallScreen ? "1rem" : "0",  // Add margin top on small screens for better spacing
            }}
          >
            {isPredictions
              ? "Hide Machine Learning-Based Revenue Forecast for Next Year"  // When predictions are visible, show 'Hide'
              : "View Machine Learning-Based Revenue Forecast for Next Year"  // When predictions are hidden, show 'View'
            }
          </Button>
        </Flexbetween>

        <ResponsiveContainer width="100%" height={isSmallScreen ? 500 : "100%"}>
          <LineChart
            data={formattedData}  // Data for the chart
            margin={{
              top: isSmallScreen ? 10 : 20,  // Adjust top margin for small screens
              right: isSmallScreen ? 30 : 75,  // Adjust right margin for small screens
              left: isSmallScreen ? 20 : 20,  // Left margin stays the same
              bottom: isSmallScreen ? 80 : 80,  // Adjust bottom margin for small screens (increased)
            }}
          >
            {/* Add a grid to the chart for better readability */}
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            {/* Set up the X axis */}
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: isSmallScreen ? "12px" : "14px" }}>
              <Label value="Month" offset={-15} position="insideBottom" />  {/* Label for X axis */}
            </XAxis>
            {/* Set up the Y axis */}
            <YAxis
              domain={[14000, 26000]}  // Set the range for the Y axis
              axisLine={{ strokeWidth: "0" }}  // Hide the axis line
              style={{ fontSize: isSmallScreen ? "12px" : "14px" }}
              tickFormatter={(v) => `$${v}`}  // Format the Y axis ticks as currency
            >
              <Label
                value="Revenue"
                angle={-90}  // Rotate the label for the Y axis
                offset={-15}  // Adjust the label position
                position="insideLeft"  // Position the label on the left
              />
            </YAxis>
            <Tooltip />  {/* Show a tooltip when hovering over the chart */}
            <Legend verticalAlign="top" />  {/* Display the legend at the top */}

            {/* Line for actual revenue */}
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}  // Line color for actual revenue
              strokeWidth={0}  // Remove the border around the line
              dot={{ strokeWidth: 5 }}  // Customize the size of the dots on the line
            />
            {/* Line for regression line */}
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"  // Line color for regression line
              dot={false}  // Hide dots on the regression line
            />
            {/* Conditionally render the predicted revenue line based on state */}
            {isPredictions && (
              <Line
                strokeDasharray="5 5"  // Make the predicted line dashed
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}  // Line color for predicted revenue
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </LoadingWrapper>
    </DashboardBox>
  );
};

export default Predictions;
