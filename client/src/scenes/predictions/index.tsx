import { useGetKpisQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
import Flexbetween from '@/components/FlexBetween';

type Props = {}

const Predictions = (props: Props) => {
  const { palette } = useTheme();
  const { isPredictions, setIsPredictions } = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  return (
    <DashboardBox width="100%" height="100%" padding="1rem 2rem 4rem 2rem" overflow="hidden">
      <Flexbetween m="1rem 2.5rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">Charted revenue and predicted revenue based on a linear regression model</Typography>
        </Box>
      </Flexbetween>
    </DashboardBox>
  )
}

export default Predictions