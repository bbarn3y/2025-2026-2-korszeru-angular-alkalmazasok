import {Component, inject} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {routeToLogin} from '../../_helpers/routing.helper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.html',
  styleUrl: './lobby.less',
})
export class Lobby {

  private readonly router: Router = inject(Router);
  private readonly userService: UserService = inject(UserService);

  logout() {
    this.userService.removeToken();
    routeToLogin(this.router);
  }

}
