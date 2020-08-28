import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface MealKPIProps {}

const MealKPI: React.FC<MealKPIProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h1>KPI WORKS!</h1>
    </div>
  );
};

export default MealKPI;
