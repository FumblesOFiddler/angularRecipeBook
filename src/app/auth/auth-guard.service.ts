import {ActivatedRouteSnapshot, CanActivate, RouterState, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  // canActivate returns a promise, an observable, or a boolean. The promise for authentication is handled by
  // the auth service already, no need to re-do it here, just check if a token has been stored.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}
