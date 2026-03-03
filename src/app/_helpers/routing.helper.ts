import {Router} from '@angular/router';
import {APP_ROUTES} from '../app.routes';


export function routeToLobby(router: Router): Promise<boolean> {
  return router.navigateByUrl(`/${APP_ROUTES.inner}`);
}

export function routeToLogin(router: Router): Promise<boolean> {
  return router.navigateByUrl(`/${APP_ROUTES.login}`);
}
