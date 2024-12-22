import { useGetKpisQuery } from '@/state/api';
import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
import Flexbetween from '@/components/FlexBetween';
import { CartesianGrid, Legend, Line, Tooltip, LineChart, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts';

type Props = {}

const Predictions = (props: Props) => {
  const { palette } = useTheme();
  const { isPredictions, setIsPredictions } = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  return (
    <DashboardBox width="100%" height="100%" padding="1rem 2rem 4rem 2rem" overflow="hidden">
      <Flexbetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">Charted revenue and predicted revenue based on a linear regression model</Typography>
        </Box>
        <Button
          onclick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[500],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)",
          }}
        >Show Predicted Revenue with Machine Learning Model
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
          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: "12px" }}
          >
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={["dataMin", "dataMax"]} // This will set the domain of the y-axis to the min and max of the data
            axisLine={{ strokeWidth: "0" }} // This will remove the axis line
            style={{ fontSize: "12px" }}
            tickFormatter={(v) => `$${v / 1000}k`} // This will format the tick values to be in thousands
          >
            <Label value="Revenue" angle={-90} offset={-5} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top"/>
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
          
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  )
}

export default Predictions