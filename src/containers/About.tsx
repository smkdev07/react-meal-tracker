import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
  const classes = useStyles();
  return (
    <section>
      <h1>About Works!</h1>
    </section>
  );
};

export default About;
