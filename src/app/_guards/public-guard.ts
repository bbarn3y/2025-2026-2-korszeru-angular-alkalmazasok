import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../_services/user.service';
import {APP_ROUTES} from '../app.routes';


function publicGuard() {
  const router: Router = inject(Router);
  const userService: UserService = inject(UserService);

  return !userService.isLoggedIn()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.inner]);
}

export const publicGuardSelf: CanActivateFn = (childRoute, state) => {
  return publicGuard();
};
