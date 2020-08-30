import React, { useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import SectionHeader from '../components/SectionHeader';
import MealForm from '../components/dashboard/MealForm';
import MealKPI from '../components/dashboard/MealKPI';
import MealLog from '../components/dashboard/MealLog';
import MealCharts from '../components/dashboard/MealCharts';

import { RootState } from '../store/reducers/index';
import { getMealsFromDatabase } from '../store/actions/index';

const useStyles = makeStyles((theme) => ({
  chartSection: {
    marginTop: theme.spacing(4),
  },
}));

interface DashboardProps extends PropsFromRedux {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();

  const { token, userId, loading, error, getMealEntries } = props;

  useEffect(() => {
    getMealEntries(token!, userId!);
  }, [token, userId, getMealEntries]);

  return (
    <Grid container justify="center" alignItems="flex-start" spacing={0}>
      <Grid item xs={12} component="header">
        <Typography color="primary" variant="h3">
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} component="section">
        <SectionHeader title="Add Entry" spacingBottom={1} />
        <MealForm />
      </Grid>
      <Grid item xs={12} component="section">
        <SectionHeader title="Entry Stats" spacingBottom={1} />
        <MealKPI />
      </Grid>
      <Grid item xs={12} component="section" className={classes.chartSection}>
        <MealCharts />
      </Grid>
      <Grid item xs={12} component="section">
        <SectionHeader title="Entry Log" spacingBottom={1} />
        <MealLog />
      </Grid>
    </Grid>
  );
};

const mapState = (state: RootState) => ({
  token: state.auth.token,
  userId: state.auth.userId,
  loading: state.meals.loading,
  error: state.meals.error,
});

const mapDispatch = {
  getMealEntries: (token: string, userId: string) =>
    getMealsFromDatabase(token, userId),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
