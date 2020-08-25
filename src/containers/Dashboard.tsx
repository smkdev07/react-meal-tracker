import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();
  return (
    <section>
      <h1>Dashboard Works!</h1>
    </section>
  );
};

export default Dashboard;
