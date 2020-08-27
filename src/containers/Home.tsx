import React from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

import LandingImage from '../assets/landing_image.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  headline: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(2),
  },
  subHeadline: {
    marginBottom: theme.spacing(4),
  },
  buttonMain: {
    marginRight: theme.spacing(2),
  },
  image: {
    height: '100%',
    width: '100%',
  },
}));

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      // alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12} md={6}>
        <Typography color="primary" variant="h2" className={classes.headline}>
          Simplify the way you track meals.
        </Typography>
        <Typography
          color="textSecondary"
          variant="h5"
          className={classes.subHeadline}
        >
          Stay accountable today so you can achieve results tomorrrow.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/SignUp"
          className={classes.buttonMain}
        >
          Sign Up
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/SignIn"
        >
          Sign In
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={LandingImage}
          alt="Healthy Lifestyle"
          className={classes.image}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
