import {Component, inject, signal} from '@angular/core';
import {NavigationCancel, NavigationError, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true,
})
export class App {
  protected readonly title = signal('korszeru-angular-25-26-2');

  private readonly router: Router = inject(Router);

  constructor() {
    this.router.events.subscribe((e) => {
      // console.log(e);
      if (e instanceof NavigationCancel) {
        console.warn('Navigation canceled: ', e);
      } else if (e instanceof NavigationError) {
        console.error('Navigation error: ', e);
      }
    })
  }

}
