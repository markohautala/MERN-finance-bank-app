import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import Flexbetween from "@/components/FlexBetween";

// Sample data for the Pie chart
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme(); // MUI theme hook to access colors
  const pieColors = [palette.primary[800], palette.primary[300]]; // Set colors for the pie chart slices

  // Fetch operational data and product data using custom API queries
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  // Memoize operational expenses to prevent unnecessary re-renders
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3), // Use first 3 letters of the month
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]); // Recalculate when operationalData changes

  // Memoize product expense data to avoid unnecessary re-renders
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id, // Unique product ID
          price: price, // Product price
          expense: expense, // Product expense
        };
      })
    );
  }, [productData]); // Recalculate when productData changes

  return (
    <>
      {/* DashboardBox for Operational vs Non-Operational Expenses chart */}
      <DashboardBox gridArea="d">
        <LoadingWrapper>
          <BoxHeader
            title="Operational vs Non-Operational Expenses"
            sideText="+4%" // Display a change percentage
          />
          {/* Responsive container for the line chart */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={operationalExpenses}
              margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55, // Bottom margin for x-axis
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name" // Set the x-axis to use the month name
                tickLine={false}
                style={{ fontSize: "13px" }}
              />
              <YAxis
                yAxisId="left" // Left axis for non-operational expenses
                orientation="left"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                yAxisId="right" // Right axis for operational expenses
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "12px" }}
              />
              <Tooltip /> {/* Tooltip on hover */}
              {/* Lines for Operational and Non-Operational Expenses */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Non Operational Expenses"
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Operational Expenses"
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>

      {/* DashboardBox for Campaign and Targets */}
      <DashboardBox gridArea="e">
        <LoadingWrapper>
          <BoxHeader title="Campaign and Targets" sideText="+4%" />
          <Flexbetween mt="0.25rem" gap="1.5rem" pr="1rem">
            {/* Pie chart displaying some data */}
            <PieChart
              width={110}
              height={100}
              margin={{
                top: 0,
                right: -10,
                left: 10,
                bottom: 0,
              }}
            >
              <Pie
                stroke="none"
                data={pieData} // Pass the pieData
                innerRadius={18} // Inner radius for the doughnut effect
                outerRadius={38}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
            {/* Text displaying target sales and related info */}
            <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
              <Typography variant="h5">Target Sales</Typography>
              <Typography m="0.4rem 0" variant="h3" color={palette.primary[300]}>
                83 {/* Display target sales value */}
              </Typography>
              <Typography variant="h6" color={palette.grey[600]}>
                Desired finance goals of the campaign
              </Typography>
            </Box>
            <Box flexBasis="40%">
              <Typography variant="h5">Losses in Revenue</Typography>
              <Typography variant="h6">Losses are down 25%</Typography>
              <Typography mt="0.4rem" variant="h5">
                Profit Margins
              </Typography>
              <Typography variant="h6">
                Margins are up by 30% from last month
              </Typography>
            </Box>
          </Flexbetween>
        </LoadingWrapper>
      </DashboardBox>

      {/* DashboardBox for Product Prices vs Expenses scatter chart */}
      <DashboardBox gridArea="f">
        <LoadingWrapper>
          <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
          {/* Responsive container for the scatter chart */}
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 22,
                bottom: 38,
                left: -25,
              }}
            >
              <CartesianGrid stroke={palette.grey[800]} />
              <XAxis
                type="number"
                dataKey="price" // x-axis shows product price
                name="price"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
                tickFormatter={(v) => `$${v}`} // Format the price with a dollar sign
              />
              <YAxis
                type="number"
                dataKey="expense" // y-axis shows product expense
                name="expense"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
                tickFormatter={(v) => `$${v}`} // Format the expense with a dollar sign
              />
              <Tooltip formatter={(v) => `$${v}`} /> {/* Tooltip for expenses */}
              {/* Scatter plot showing product price vs expense data */}
              <Scatter
                name="Product Expense Ratio"
                data={productExpenseData} // Product expense data
                fill={palette.tertiary[500]} // Set the color for scatter plot
              />
              <ZAxis type="number" range={[70]} /> {/* Z-axis for dot size */}
            </ScatterChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>
    </>
  );
};

export default Row2;
