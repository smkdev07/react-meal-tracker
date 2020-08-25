import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(1),
    height: 'calc(100vh - 94px)',
  },
}));

interface MainProps {}

const Main: React.FC<MainProps> = (props) => {
  const classes = useStyles();
  return <main className={classes.main}>{props.children}</main>;
};

export default Main;
