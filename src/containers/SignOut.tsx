import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { authSignOut } from '../store/actions/index';

interface SignOutProps extends PropsFromRedux {}

const SignOut: React.FC<SignOutProps> = (props) => {
  useEffect(() => {
    props.signOut();
  }, [props]);

  return <Redirect to="/Home" />;
};

const mapDispatch = {
  signOut: () => authSignOut(),
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignOut);
