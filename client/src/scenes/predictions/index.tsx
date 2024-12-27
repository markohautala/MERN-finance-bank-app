import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import LoadingWrapper from "@/components/LoadingWrapper";
import DashboardBox from "@/components/DashboardBox";
import Flexbetween from "@/components/FlexBetween";
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
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return []; //So if kpiData does not exist, we want to return an empty arry
    const monthData = kpiData[0].monthlyData; // Grabbing the monthly data from our kpiData

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox
      width="100%"
      height="100%"
      padding="1rem 2rem 4rem 2rem"
      overflow="hidden"
    >
      <LoadingWrapper>
        <Flexbetween m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>
            <Typography variant="h6">
              Charted revenue and predicted revenue based on a linear regression
              model
            </Typography>
          </Box>
          <Button
            onClick={() => setIsPredictions(!isPredictions)}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[500],
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)",
            }}
          >
            Show Predicted Revenue with Machine Learning Model
          </Button>
        </Flexbetween>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20, // top margin
              right: 75, // right margin
              left: 20, // left margin
              bottom: 80, // bottom margin
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px" }}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              domain={[12000, 26000]} // This will set the domain of the y-axis to the min and max of the data
              axisLine={{ strokeWidth: "0" }} // This will remove the axis line
              style={{ fontSize: "12px" }}
              tickFormatter={(v) => `$${v}`} // This will format the tick values to be in thousands
            >
              <Label
                value="Revenue"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />
            {isPredictions && (
              <Line
                strokeDasharray="5 5"
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </LoadingWrapper>
    </DashboardBox>
  );
};

export default Predictions;
