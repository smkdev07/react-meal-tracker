import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

interface SignInProps {}

const SignIn: React.FC<SignInProps> = (props) => {
  const classes = useStyles();
  return (
    <section>
      <h1>Sign In Works!</h1>
    </section>
  );
};

export default SignIn;
