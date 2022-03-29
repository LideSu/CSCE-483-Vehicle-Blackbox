// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

// ----------------------------------------------------------------------

const TOTAL = 2123;

export default function AppAverageRPM() {
  return (
    <RootStyle>
      <Typography variant="h3">{`${fNumber(TOTAL)} rpm`}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Average RPM
      </Typography>
    </RootStyle>
  );
}
