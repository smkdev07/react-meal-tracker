import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(1),
  },
}));

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography align="center" color="primary" variant="subtitle2">
        {props.children}
      </Typography>
    </footer>
  );
};

export default Footer;
