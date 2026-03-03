import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {inject} from '@angular/core';
import {APP_ROUTES} from '../app.routes';

function privateGuard() {
  const router: Router = inject(Router);
  const userService: UserService = inject(UserService);

  // console.log('private guard', userService.isLoggedIn());

  return userService.isLoggedIn()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.login]);
}

export const privateGuardSelf: CanActivateFn = (childRoute, state) => {
  return privateGuard();
};

export const privateGuardChild: CanActivateChildFn = (childRoute, state) => {
  return privateGuard();
};
