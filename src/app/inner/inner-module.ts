import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Lobby} from './lobby/lobby';
import {RouterModule, Routes} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CharacterListingComponent} from './character-listing.component/character-listing.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzEmptyModule} from 'ng-zorro-antd/empty';

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
    CharacterListingComponent,
    Lobby
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class InnerModule { }
