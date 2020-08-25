import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(1),
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

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item component="header">
        <Typography color="textPrimary" variant="h2">
          About
        </Typography>
      </Grid>
      <Grid item component="section">
        <div className={classes.overline} />
        <Typography color="textSecondary" variant="h5">
          Meal Tracker
        </Typography>
        <Typography color="textPrimary" variant="body1">
          This meal tracking application empowers users to easily track their
          meals. Users can register and sign in to log meals and view their
          personal dashboard.
        </Typography>
      </Grid>
      <Grid item component="section">
        <div className={classes.overline} />
        <Typography color="textSecondary" variant="h5">
          Technology
        </Typography>
        <Typography color="textPrimary" variant="body1">
          The application is built using{' '}
          <Chip color="primary" size="small" component="span" label="React" />{' '}
          with{' '}
          <Chip
            color="primary"
            size="small"
            component="span"
            label="TypeScript"
          />
          . The UI is built with a combination of{' '}
          <Chip
            color="primary"
            size="small"
            component="span"
            label="Material-UI"
          />{' '}
          and custom CSS-in-JS. The charting library used for the dashboard is{' '}
          <Chip color="primary" size="small" component="span" label="Nivo" />.
          Data is stored both locally using{' '}
          <Chip color="primary" size="small" component="span" label="Redux" />{' '}
          and in Google Firebase using REST APIs in combination with{' '}
          <Chip color="primary" size="small" component="span" label="Thunk" />{' '}
          middleware.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
