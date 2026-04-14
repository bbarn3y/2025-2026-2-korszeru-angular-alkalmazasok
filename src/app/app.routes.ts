import { Routes } from '@angular/router';
import {Login} from './login/login';
import {privateGuardChild, privateGuardSelf} from './_guards/private-guard';
import {publicGuardSelf} from './_guards/public-guard';

export const APP_ROUTES = {
  konva: 'konva' as const,
  login: 'login' as const,
  inner: 'inner' as const,
}

export const routes: Routes = [
  {
    path: APP_ROUTES.login,
    component: Login,
    canActivate: [publicGuardSelf]
    // loadComponent: () => { return import('./login/login').then(c => c.Login)}
  },
  {
    path: APP_ROUTES.inner,
    loadChildren: () => import('./inner/inner-module')
      .then((m) => m.InnerModule),
    canActivate: [privateGuardSelf],
    canActivateChild: [privateGuardChild]
  },
  {
    path: APP_ROUTES.konva,
    loadComponent: () => { return import('./konva/konva.component').then(c => c.KonvaComponent)},
    canActivate: [privateGuardSelf],
    canActivateChild: [privateGuardChild]
  },
  {
    path: '**',
    redirectTo: `/${APP_ROUTES.login}`
  }
];
