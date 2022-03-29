/*eslint-disable*/
// material
import { Box, Grid, Container, Typography } from '@mui/material';

import Login from "./Login";
import useToken from './useToken';

// components
import Page from '../components/Page';
import {
  AppAverageVelocity,
  AppAverageRPM,
  AppAverageAcceleration,
  AppBlackboxConclusion,
  AppTripTime,
  AppOrderTimeline,
  AppMovingStationary,
  AppVelocityGraph,
  AppAccelerationGraph,
  AppBreakingGraph,
  AppThrottlePosition,
  AppWheelAngle
} from '../sections/@dashboard/app';
import DashboardLayout from "../layouts/dashboard";

// ----------------------------------------------------------------------

export default function DashboardApp() {

  // Saving userToken argument to sessionStorage w/ setItem
  // Each new tab will have to reauthenticate

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (

    <Page title="Dashboard">
      <DashboardLayout/>
      <Container maxWidth="xl">

        <Box sx={{ pb: 5 }} mt={-18} ml={18} px={22} >
          <Typography variant="h4">Blackbox Data Analyzation Web App</Typography>
        </Box>


        <Grid container spacing={3} ml={15} px={22}>
          <Grid item xs={12} sm={6} md={3}>
            <AppTripTime />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppAverageVelocity />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppAverageAcceleration />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppAverageRPM />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppVelocityGraph />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppMovingStationary />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <AppAccelerationGraph />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppBreakingGraph />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <AppThrottlePosition />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppWheelAngle />
          </Grid>
          {/*<Grid item xs={6} md={4} lg={4}>*/}
          {/*  <AppOrderTimeline />*/}
          {/*</Grid>*/}
          <Grid item xs={12} md={6} lg={8}>
            <AppBlackboxConclusion />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
