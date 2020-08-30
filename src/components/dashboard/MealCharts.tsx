import React from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';

import { RootState } from '../../store/reducers/index';
import {
  getEntryStatistics,
  getEntriesCalorieBreakdown,
} from '../../store/selectors/meals';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    padding: theme.spacing(2),
    height: 500,
  },
}));

interface MealChartsProps extends PropsFromRedux {}

const MealCharts: React.FC<MealChartsProps> = (props) => {
  const classes = useStyles();
  const { entryStatistics, recentEntries } = props;

  const pieData = entryStatistics
    .filter((statistic) => statistic.id !== 'calories')
    .map((statistic) => ({
      id: statistic.id,
      label: statistic.label,
      color: statistic.color,
      value: statistic.percentOfTotalCalories!,
      sliceLabel: `${(statistic.percentOfTotalCalories! * 100).toFixed(2)}%`,
    }));

  const charts =
    recentEntries.length > 0 ? (
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} className={classes.chartContainer}>
            <Typography color="primary" variant="h5">
              Total Calorie Distribution
            </Typography>
            <PieChart data={pieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} className={classes.chartContainer}>
            <Typography color="primary" variant="h5">
              Recent Entires
            </Typography>
            <BarChart
              data={recentEntries}
              keys={['protien', 'fat', 'carbohydrate']}
              indexBy="loggedTime"
            />
          </Paper>
        </Grid>
      </Grid>
    ) : null;

  return charts;
};

const mapState = (state: RootState) => ({
  entryStatistics: getEntryStatistics(state.meals.meals),
  recentEntries: getEntriesCalorieBreakdown(state.meals.meals).slice(0, 15),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MealCharts);
