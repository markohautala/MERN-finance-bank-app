import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useMemo } from "react";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

const Row2 = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
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
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default Row2;
