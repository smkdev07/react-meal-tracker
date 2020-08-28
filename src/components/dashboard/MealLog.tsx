import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface MealLogProps {}

const MealLog: React.FC<MealLogProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h1>LOG WORKS!</h1>
    </div>
  );
};

export default MealLog;
