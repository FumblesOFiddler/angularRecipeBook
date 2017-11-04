import {Action} from "@ngrx/store";

export const TRY_SIGNIN = 'TRY_SIGNIN'
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIM';
export const LOGOUT = 'LOGOUT';
export const SETTOKEN = 'SETTOKEN'

export class TrySignup implements Action { // Not registered in the reducer because it doesn't modify the app state.
    // It is a side effect - A result of a state modification that does not itself modify the state.
  readonly type = TRY_SIGNUP;
  constructor(public payload: {username: string, password: string}) {}
}
export class TrySignin implements Action { // Not registered in the reducer because it doesn't modify the app state.
    // It is a side effect - A result of a state modification that does not itself modify the state.
  readonly type = TRY_SIGNIN;
  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}
export class Signin implements Action {
  readonly type = SIGNIN;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}
export class SetToken implements Action {
  readonly type = SETTOKEN;
  constructor(public payload: string) {}
}

export type AuthActions =
  Signup |
  Signin |
  Logout |
  SetToken |
  TrySignup |
  TrySignin;
