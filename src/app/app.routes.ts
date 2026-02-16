import { Routes } from '@angular/router';
import {Login} from './login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    // loadComponent: () => { return import('./login/login').then(c => c.Login)}
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
