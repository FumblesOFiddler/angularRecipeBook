import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../store/auth.actions';
import {AuthActions} from "../store/auth.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    this.store.dispatch(new authActions.TrySignin({username: email, password: pass}));

  }

}
