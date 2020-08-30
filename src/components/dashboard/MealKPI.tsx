import React from 'react';

import { connect, ConnectedProps } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';

import { RootState } from '../../store/reducers/index';
import { getEntryStatistics } from '../../store/selectors/meals';

// const useStyles = makeStyles((theme) => ({}));

interface MealKPIProps extends PropsFromRedux {}

const MealKPI: React.FC<MealKPIProps> = (props) => {
  // const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={1}>
      {props.entryStatistics.map((statistic) => (
        <Grid item xs={12} md={6} lg={6} xl={3} key={statistic.id}>
          <Card elevation={2}>
            <CardHeader title={statistic.label} />
            <CardContent>
              <Typography
                variant="h2"
                display="inline"
                style={{ color: statistic.color, fontWeight: 'bold' }}
              >
                {statistic.calories}
              </Typography>
              <Typography variant="h4" color="textPrimary" display="inline">
                {` CAL  `}
              </Typography>
              {statistic.grams || statistic.numberOfEntries ? (
                <>
                  <Typography variant="h5" color="textPrimary" display="inline">
                    ({statistic.grams || statistic.numberOfEntries}
                  </Typography>
                  <Typography variant="h6" color="textPrimary" display="inline">
                    {statistic.grams ? 'g' : ' meals'}
                  </Typography>
                  <Typography variant="h5" color="textPrimary" display="inline">
                    )
                  </Typography>
                </>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const mapState = (state: RootState) => ({
  entryStatistics: getEntryStatistics(state.meals.meals),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MealKPI);
