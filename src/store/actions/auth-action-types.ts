export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';

export interface AuthStartAction {
  type: typeof AUTH_START;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  payload: { idToken: string; localId: string };
}

export interface AuthFailureAction {
  type: typeof AUTH_FAILURE;
  payload: { errorMessage: string };
}

export interface AuthSignOutAction {
  type: typeof AUTH_SIGN_OUT;
}

export type AuthActionTypes =
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailureAction
  | AuthSignOutAction;
