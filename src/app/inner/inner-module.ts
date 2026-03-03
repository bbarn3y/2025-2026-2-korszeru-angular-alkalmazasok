import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Lobby} from './lobby/lobby';
import {RouterModule, Routes} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';

export const routes: Routes = [
  {
    path: '',
    component: Lobby,
  },
  {
    path: '**',
    component: Lobby
  }
];

@NgModule({
  declarations: [
    Lobby
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class InnerModule { }
