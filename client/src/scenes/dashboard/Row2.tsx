import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
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
} from "recharts";
import Flexbetween from "@/components/FlexBetween";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses
        };
      })
    );
  }, [operationalData]); // run only when data changes

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20, // top margin
              right: 0, // right margin
              left: -10, // left margin
              bottom: 55, // bottom margin
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} /> //
            Only horisontal lines
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              yAxisId="left" // This is the axis on the left side
              orientation="left" // This will place the axis on the left side
              tickLine={false}
              axisLine={false} // This will remove the axis line
              style={{ fontSize: "12px" }}
            />
            <YAxis
              yAxisId="right" // This is the axis on the right side
              orientation="right" // This will place the axis on the right side
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left" // This will place the line on the left side
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right" // This will place the line on the right side
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader
          title="Campaign and Targets"
          sideText="+4%"
        />
        <Flexbetween
          mt="0.25rem"
          gap="1.5rem"
          pr="1rem" // pr means padding right
        >
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0, // top margin
              right: -10, // right margin
              left: 10, // left margin
              bottom: 0, // bottom margin
            }}
          >
            <Pie
              stroke="none"  // This will remove the border on the pie chart
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index]}
                />
              ))}
            </Pie>
          </PieChart>
          <Box
            ml="-0.7rem" // ml means margin left
            flexBasis="40%"  // This will try to make the box take up 40% of the remaining space
            textAlign="center"  // This will center the text
          >
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.4rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
            <Typography variant="h6" color={palette.grey[600]}>Desired finance goals of the campaign</Typography>
          </Box>
          <Box
            flexBasis="40%"  // This will try to make the box take up 40% of the remaining space
          >
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography m="0.4rem 0" variant="h3" >Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5" >Profit Margins</Typography>
          </Box>
        </Flexbetween>
      </DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default Row2;
