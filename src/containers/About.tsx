import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import AboutImage from '../assets/about_image.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  contentSection: {
    marginTop: theme.spacing(20),
    paddingRight: theme.spacing(5),
  },
  overline: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    height: 8,
    width: 48,
  },
  image: {
    height: '100%',
    width: '100%',
  },
}));

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      // alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12} md={6} className={classes.contentSection}>
        <header>
          <Typography color="primary" variant="h3">
            About
          </Typography>
        </header>
        <section>
          <div className={classes.overline} />
          <Typography color="textSecondary" variant="h5">
            Meal Tracker
          </Typography>
          <Typography color="textPrimary" variant="body1">
            This meal tracking application empowers users to easily track their
            meals. Users can register and sign in to log meals and view their
            personal dashboard.
          </Typography>
        </section>
        <section>
          <div className={classes.overline} />
          <Typography color="textSecondary" variant="h5">
            Powered By
          </Typography>
          <Typography color="textPrimary" variant="body1">
            The application is built using with React & TypeScript. The UI is
            built with a combination of Material-UI and custom CSS-in-JS. The
            charting library used for the dashboard is Nivo. Data is stored both
            locally using Redux and in Google Firebase through REST APIs in
            conjunction with Thunk middleware.
          </Typography>
        </section>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={AboutImage} alt="Application" className={classes.image} />
      </Grid>
    </Grid>
  );
};

export default About;
