import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    minHeight: 'calc(100vh - 94px)',
  },
}));

interface MainProps {}

const Main: React.FC<MainProps> = (props) => {
  const classes = useStyles();
  return <main className={classes.main}>{props.children}</main>;
};

export default Main;
