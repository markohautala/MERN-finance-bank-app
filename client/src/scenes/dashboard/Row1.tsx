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
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]); // run only when data changes

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]); // run only when data changes

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3), // Only show the first 3 letters of the month
          revenue: revenue,
          profit: Number((revenue - expenses).toFixed(2)), // Calculate the profit. toFixed will round the number to 2 decimal places and convert it back to a number
        };
      })
    );
  }, [data]); // run only when data changes

  return (
    <>
      <DashboardBox gridArea="a">
        <LoadingWrapper>
          <BoxHeader
            title="Revenue and Expenses"
            subtitle="Top line represents revenue, bottom line represents expenses"
            sideText="+4%"
          />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{
                top: 15, // top margin
                right: 20, // right margin
                left: -10, // left margin
                bottom: 60, // bottom margin
              }}
            >
              <defs>
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
                domain={[10000, 23500]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dot={true}
                dataKey="revenue"
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
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

      <DashboardBox gridArea="b">
        <LoadingWrapper>
          <BoxHeader
            title="Profit and Revenue"
            subtitle="Top line represents revenue, bottom line represents expenses"
            sideText="+4%"
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueProfit}
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
                  margin: "0px 0px 10px 0px",
                }}
              />
              <Line
                yAxisId="left" // This will place the line on the left side
                type="monotone"
                dataKey="profit"
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId="right" // This will place the line on the right side
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <LoadingWrapper>
          <BoxHeader
            title="Revenue by Month"
            subtitle="Graph showing revenue by month"
            sideText="+4%"
          />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenue}
              margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 58,
              }}
            >
              <defs>
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
              <Bar
                dataKey="revenue" // This is the key in the data object
                fill="url(#colorRevenue)" // This is the gradient color
                activeBar={<Rectangle fill="white" stroke="black" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </LoadingWrapper>
      </DashboardBox>
    </>
  );
};

export default Row1;
