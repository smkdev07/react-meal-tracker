import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import AboutImage from '../assets/about_image.svg';

import SectionHeader from '../components/SectionHeader';

const useStyles = makeStyles((theme) => ({
  contentSection: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
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
    >
      <Grid item xs={12} md={6} className={classes.contentSection}>
        <header>
          <Typography color="primary" variant="h3">
            About
          </Typography>
        </header>
        <section>
          <SectionHeader title="Meal Tracker" />
          <Typography color="textPrimary" variant="body1">
            This meal tracking application empowers users to easily track their
            meals. Users can register and sign in to log meals and view their
            personal dashboard.
          </Typography>
        </section>
        <section>
          <SectionHeader title="Powered By" />
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
