import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import {
  authSignOut,
  setMealCategories,
  setMeals,
} from '../store/actions/index';

interface SignOutProps extends PropsFromRedux {}

const SignOut: React.FC<SignOutProps> = (props) => {
  useEffect(() => {
    props.clearMealCategories();
    props.clearMealEntires();
    props.signOut();
  }, [props]);

  return <Redirect to="/Home" />;
};

const mapDispatch = {
  signOut: () => authSignOut(),
  clearMealCategories: () => setMealCategories([]),
  clearMealEntires: () => setMeals([]),
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignOut);
