import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import MealForm from '../components/dashboard/MealForm';
import MealKPI from '../components/dashboard/MealKPI';
import MealLog from '../components/dashboard/MealLog';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
  },
  overline: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    height: 8,
    width: 48,
  },
}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      spacing={0}
      className={classes.container}
    >
      <Grid item xs={12}>
        <div className={classes.overline} />
        <Typography align="left" color="primary" variant="h3">
          My Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MealForm />
      </Grid>
      <Grid item xs={12}>
        <MealKPI />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <MealLog />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
