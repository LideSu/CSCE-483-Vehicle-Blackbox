/* eslint-disable */
// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import {fHrMinSec} from '../../../utils/formatNumber';
// component

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

const TOTAL = 8274;

export default function AppTripTime() {
  return (
    <RootStyle>
      <Typography variant="h3">{`${fHrMinSec(TOTAL)}`}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Trip Time
      </Typography>
    </RootStyle>
  );
}
