import React, { useState, ChangeEvent, FormEvent } from 'react';

import { RouteComponentProps, Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { INITIAL_INPUT_FIELD_STATE } from '../utility/forms';
import { RootState } from '../store/reducers/index';
import { auth, AuthMode } from '../store/actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(22),
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  containerLoading: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
  },
  alert: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
}));

interface SignInProps extends RouteComponentProps, PropsFromRedux {}

const SignIn: React.FC<SignInProps> = (props) => {
  const classes = useStyles();
  const [emailAddress, setEmailAddress] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });
  const [password, setPassword] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });

  const { auth, loading, error, signedIn, location } = props;

  const pageMode: { authMode: AuthMode; label: string } =
    location.pathname === '/SignUp'
      ? { authMode: 'signup', label: 'Sign Up' }
      : { authMode: 'signin', label: 'Sign In' };

  const onFieldChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    const value = event.target.value;
    const updatedField = {
      value,
      touched: true,
      valid: value.trim().length > 0,
    };

    switch (field) {
      case 'email':
        setEmailAddress((prevState) => updatedField);
        break;
      case 'password':
        setPassword((prevState) => updatedField);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth(emailAddress.value, password.value, pageMode.authMode);
    setPassword((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
  };

  let authRedirect = null;

  if (signedIn) {
    authRedirect = <Redirect to="/Dashboard" />;
  }

  let authErrorMessage = null;

  if (error) {
    authErrorMessage = (
      <Alert severity="error" className={classes.alert}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return loading ? (
    <div className={classes.containerLoading}>
      <CircularProgress />
    </div>
  ) : (
    <Paper className={classes.paper}>
      {authRedirect}
      <Avatar className={classes.avatar}></Avatar>
      <Typography component="h1" variant="h5">
        {pageMode.label}
      </Typography>
      {authErrorMessage}
      <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          autoFocus
          value={emailAddress.value}
          onChange={(event) => onFieldChangeHandler(event, 'email')}
          error={emailAddress.touched && !emailAddress.valid}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={password.value}
          onChange={(event) => onFieldChangeHandler(event, 'password')}
          error={password.touched && !password.valid}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!emailAddress.valid || !password.valid}
          className={classes.submit}
        >
          {pageMode.label}
        </Button>
      </form>
    </Paper>
  );
};

const mapState = (state: RootState) => ({
  signedIn: state.auth.token !== null,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatch = {
  auth: (emailAddress: string, password: string, authMode: AuthMode) =>
    auth(emailAddress, password, authMode),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignIn);
