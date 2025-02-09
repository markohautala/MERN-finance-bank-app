import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme(); // Getting the theme colors
  const { data, isLoading: isKpiLoading } = useGetKpisQuery(); // Fetching KPI data from the API

  // Create a fetchData function for LoadingWrapper
  const fetchData = async () => {
    // Wait for the data to be fetched
    if (!isKpiLoading && data) {
      return data; // Return the data once it's available
    }
  };

  // Memoizing the revenue data to prevent unnecessary re-renders
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3), // Only show the first 3 letters of the month
          revenue: revenue,
        };
      })
    );
  }, [data]); // This will run only when the data changes

  // Memoizing revenue and expenses data to calculate revenue and expenses side-by-side
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3), // Only show the first 3 letters of the month
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]); // Recalculates only when data changes

  // Memoizing revenue and profit data (profit = revenue - expenses)
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: Number((revenue - expenses).toFixed(2)), // Calculating profit with rounding
        };
      })
    );
  }, [data]); // Recalculates only when data changes

  return (
    <>
      {/* First Dashboard Box for Revenue and Expenses */}
      <DashboardBox gridArea="a">
        <LoadingWrapper fetchData={fetchData}>
          <BoxHeader
            title="Revenue and Expenses"
            subtitle="Top line represents revenue, bottom line represents expenses"
            sideText="+4%" // Side text indicating change (e.g., 4% increase)
          />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueExpenses}
              margin={{
                top: 15, // top margin
                right: 15, // right margin
                left: 0, // left margin
                bottom: 75, // bottom margin
              }}
            >
              <defs>
                {/* Gradient for revenue */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[900]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[900]}
                    stopOpacity={0}
                  />
                </linearGradient>
                {/* Gradient for expenses */}
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[800]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[700]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "12px" }}
                domain={[10000, 23500]} // Setting the range for the Y-axis
              />
              <Tooltip />
              {/* Area chart for revenue */}
              <Area
                type="monotone"
                dot={true}
                dataKey="revenue"
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              {/* Area chart for expenses */}
              <Area
                type="monotone"
                dot={true}
                dataKey="expenses"
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>

      {/* Second Dashboard Box for Profit and Revenue */}
      <DashboardBox gridArea="b">
        <LoadingWrapper fetchData={fetchData}>
          <BoxHeader
            title="Profit and Revenue"
            subtitle="Top line represents revenue, bottom line represents expenses"
            sideText="+4%" // Side text indicating change (e.g., 4% increase)
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueProfit}
              margin={{
                top: 20, // top margin
                right: 0, // right margin
                left: 0, // left margin
                bottom: 75, // bottom margin
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              {/* Only horizontal lines */}
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                yAxisId="left" // This is the axis on the left side
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
              <Legend
                height={20}
                wrapperStyle={{
                  margin: "0px 0px 10px 0px", // Margin for the legend
                }}
              />
              <Line
                yAxisId="left" // This will place the line on the left side
                type="monotone"
                dataKey="profit"
                stroke={palette.tertiary[500]} // Color for profit line
              />
              <Line
                yAxisId="right" // This will place the line on the right side
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main} // Color for revenue line
              />
            </LineChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>

      {/* Third Dashboard Box for Revenue by Month */}
      <DashboardBox gridArea="c">
        <LoadingWrapper fetchData={fetchData}>
          <BoxHeader
            title="Revenue by Month"
            subtitle="Graph showing revenue by month"
            sideText="+4%" // Side text indicating change (e.g., 4% increase)
          />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenue}
              margin={{
                top: 17, // top margin
                right: 15, // right margin
                left: -5, // left margin
                bottom: 58, // bottom margin
              }}
            >
              <defs>
                {/* Gradient for revenue */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[900]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[900]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "12px" }}
              />
              <Tooltip />
              {/* Bar chart for revenue */}
              <Bar
                dataKey="revenue" // Data for the revenue bar chart
                fill="url(#colorRevenue)" // Gradient color for the bars
                activeBar={<Rectangle fill="white" stroke="black" />} // Active bar styling
              />
            </BarChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>
    </>
  );
};

export default Row1;