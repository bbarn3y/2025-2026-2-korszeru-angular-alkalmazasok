import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true,
})
export class App {
  protected readonly title = signal('korszeru-angular-25-26-2');
}
