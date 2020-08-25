import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles();
  return (
    <section>
      <h1>Home Works!</h1>
    </section>
  );
};

export default Home;
