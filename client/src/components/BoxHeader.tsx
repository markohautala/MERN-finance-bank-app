import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'

// tsrfce - create a react functional component with typescript

type Props = {
  icon?: React.ReactNode; // ReactNode is a type that can hold any JSX expression
  title: string; // title is a required prop of type string, question mark makes it optional
  subtitle?: string; // subtitle is an optional prop of type of string
  sideText: string;
}

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme()
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant='h4' mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant='h5'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography variant='h4' fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  )
}

export default BoxHeader