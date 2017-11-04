import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from "@angular/core";
import * as AuthActions from "./auth.actions";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {fromPromise} from 'rxjs/observable/fromPromise'; // Convert promise to observable.
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap( () => { // We don't care about the data returned from the above switch map, just want to call the
        // get token method after it resolves. Chaining switch maps like this lets you react to asynchronous data,
      // but you don't necessarily have to use it.
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
    this.router.navigate(['/']);
    return [ // Here we are changing the state with two actions, mergeMap generates an observable for each.
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SETTOKEN,
          payload: token
        }
      ];
  }
  );

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap( () => { // We don't care about the data returned from the above switch map, just want to call the
      // get token method after it resolves. Chaining switch maps like this lets you react to asynchronous data,
      // but you don't necessarily have to use it.
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
        return [ // Here we are changing the state with two actions, mergeMap generates an observable for each.
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SETTOKEN,
            payload: token
          }
        ];
      }
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    }); // 'do' allows execution of code during an observable's lifecycle without subscribing or fetching data.

    constructor(private actions$: Actions,
                private router: Router) {} // Dollar sign is syntax to differentiate observables, only a convention
}
