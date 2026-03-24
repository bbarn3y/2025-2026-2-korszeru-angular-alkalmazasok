import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Lobby} from './lobby/lobby';
import {RouterModule, Routes} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CharacterListingComponent} from './character-listing.component/character-listing.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {CharacterCardComponent} from './character-card.component/character-card.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NamePipe} from '../_pipes/name-pipe';
import {CharacterEditorComponent} from './character-editor.component/character-editor.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';

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
    CharacterCardComponent,
    CharacterEditorComponent,
    CharacterListingComponent,
    Lobby,
    NamePipe
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NzSelectModule
  ],
  exports: []
})
export class InnerModule { }
