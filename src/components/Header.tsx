import React from 'react';

import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
  },
  navLink: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    textDecoration: 'none',
    margin: '0 12px',

    '&:first-child': {
      margin: '0 12px 0 0',
    },
    '&:last-child': {
      margin: '0 0 0 12px',
    },

    '&:hover': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
  },
  navLinkActive: {
    color: theme.palette.secondary.main,
  },
}));

export interface NavigationLink {
  path: string;
  name: string;
  showMode: 'signin' | 'signout' | 'always';
}

interface NavigationBarProps {
  title: string;
  links: NavigationLink[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, links }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      component="header"
      className={classes.header}
    >
      <Grid item>
        <Typography color="primary" variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item component="nav">
        {links.map((link) => (
          <NavLink
            to={link.path}
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            key={link.name}
          >
            {link.name}
          </NavLink>
        ))}
      </Grid>
    </Grid>
  );
};

export default NavigationBar;
