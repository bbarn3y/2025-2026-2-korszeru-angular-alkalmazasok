import {Component, inject} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {routeToLogin} from '../../_helpers/routing.helper';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CharacterEditorComponent} from '../character-editor.component/character-editor.component';

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.html',
  styleUrl: './lobby.less',
})
export class Lobby {

  private readonly nzModalService = inject(NzModalService);
  private readonly router: Router = inject(Router);
  private readonly userService: UserService = inject(UserService);

  logout() {
    this.userService.removeToken();
    routeToLogin(this.router);
  }

  openCharacterEditor() {
    this.nzModalService.create({
      nzTitle: 'Character creator',
      nzContent: CharacterEditorComponent,
      nzFooter: null
    })
  }

}
