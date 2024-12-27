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
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]); // run only when data changes

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]); // run only when data changes

  return (
    <>
      <DashboardBox gridArea="d">
        <LoadingWrapper>
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
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
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
        </LoadingWrapper>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <LoadingWrapper>
          <BoxHeader title="Campaign and Targets" sideText="+4%" />
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
                stroke="none" // This will remove the border on the pie chart
                data={pieData}
                innerRadius={18}
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
            <Box
              ml="-0.7rem" // ml means margin left
              flexBasis="40%" // This will try to make the box take up 40% of the remaining space
              textAlign="center" // This will center the text
            >
              <Typography variant="h5">Target Sales</Typography>
              <Typography
                m="0.4rem 0"
                variant="h3"
                color={palette.primary[300]}
              >
                83
              </Typography>
              <Typography variant="h6" color={palette.grey[600]}>
                Desired finance goals of the campaign
              </Typography>
            </Box>
            <Box
              flexBasis="40%" // This will try to make the box take up 40% of the remaining space
            >
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

      <DashboardBox gridArea="f">
        <LoadingWrapper>
          <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
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
                dataKey="price"
                name="price"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
                tickFormatter={(v) => `$${v}`} // This will add a dollar sign to the tick. V is the value
              />
              <YAxis
                type="number"
                dataKey="expense"
                name="expense"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
                tickFormatter={(v) => `$${v}`} // This will add a dollar sign to the tick. V is the value
              />
              <Tooltip formatter={(v) => `$${v}`} />
              <Scatter
                name="Product Expense Ratio"
                data={productExpenseData} // This is the data for the scatter plot
                fill={palette.tertiary[500]} // This will set the color of the dots
              />
              <ZAxis
                type="number"
                range={[70]} // Sets the size of the dots
              />
            </ScatterChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>
    </>
  );
};

export default Row2;
