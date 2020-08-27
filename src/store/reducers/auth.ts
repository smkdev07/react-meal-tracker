import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_SIGN_OUT,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailureAction,
  AuthSignOutAction,
  AuthActionTypes,
} from '../actions/auth-action-types';

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state: AuthState, action: AuthStartAction) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state: AuthState, action: AuthSuccessAction) => {
  return {
    ...state,
    token: action.payload.idToken,
    userId: action.payload.localId,
    error: null,
    loading: false,
  };
};

const authFailure = (state: AuthState, action: AuthFailureAction) => {
  return {
    ...state,
    error: action.payload.errorMessage,
    loading: false,
  };
};

const authSignOut = (state: AuthState, action: AuthSignOutAction) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAILURE:
      return authFailure(state, action);
    case AUTH_SIGN_OUT:
      return authSignOut(state, action);
    default:
      return state;
  }
};

export default authReducer;
