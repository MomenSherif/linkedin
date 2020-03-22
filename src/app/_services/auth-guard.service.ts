import { Injectable } from "@angular/core";
import { UsersService } from "./users.service";
import {
  Router,
  ActivatedRoute,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild
} from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.user.pipe(
      map(us => {
        if (us) {
          return true;
        } else {
          this.router.navigate([""]);
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
