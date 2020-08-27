import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_SIGN_OUT,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailureAction,
  AuthSignOutAction,
} from './auth-action-types';
import { RootState } from '../reducers/index';

export type AuthMode = 'signup' | 'signin';

const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`;
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`;

const authStart = (): AuthStartAction => {
  return {
    type: AUTH_START,
  };
};

const authSuccess = (idToken: string, localId: string): AuthSuccessAction => {
  return {
    type: AUTH_SUCCESS,
    payload: { idToken, localId },
  };
};

const authFailure = (errorMessage: string): AuthFailureAction => {
  return {
    type: AUTH_FAILURE,
    payload: { errorMessage },
  };
};

export const authSignOut = (): AuthSignOutAction => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_SIGN_OUT,
  };
};

const authCheckTimeout = (
  expirationTime: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authSignOut());
    }, +expirationTime * 1000);
  };
};

export const authCheckState = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      dispatch(authSignOut());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate')!);
      const localId = localStorage.getItem('localId')!;
      if (expirationDate <= new Date()) {
        dispatch(authSignOut());
      } else {
        dispatch(authSuccess(idToken, localId));
        dispatch(
          authCheckTimeout(
            (
              (expirationDate.getTime() - new Date().getTime()) /
              1000
            ).toString()
          )
        );
      }
    }
  };
};

export const auth = (
  email: string,
  password: string,
  authMode: AuthMode
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(authMode === 'signup' ? SIGN_UP_URL : SIGN_IN_URL, authData)
      .then((response) => {
        const { expiresIn, idToken, localId } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('localId', localId);
        localStorage.setItem('expirationDate', expirationDate.toString());
        dispatch(authSuccess(idToken, localId));
        dispatch(authCheckTimeout(expiresIn));
      })
      .catch((error) => {
        const { message } = error.response.data.error;
        dispatch(authFailure(message));
      });
  };
};
