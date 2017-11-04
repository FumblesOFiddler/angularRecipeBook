import * as firebase from 'firebase';
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store/";
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';
import {AuthActions} from "./store/auth.actions";

/*

Auth service is not being used anymore!!! NGRX manages all authentication states. This has been left here as a ref.

 */
@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new authActions.Signup());
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new authActions.SetToken(token));
              }
            );
        }
      )// This is a promise.
      .catch(
        error => console.log(error)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new authActions.Signin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new authActions.SetToken(token));
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }
  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      ); // Promise
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new authActions.Logout());
  }
}
