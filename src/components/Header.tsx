import React from 'react';

import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
  },
  navLink: {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
    textDecoration: 'none',
    margin: '0 12px',
    
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
}

interface NavigationBarProps {
  title: string;
  links: NavigationLink[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, links }) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography color="primary" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <nav>
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
          </nav>
        </Grid>
      </Grid>
    </header>
  );
};

export default NavigationBar;
