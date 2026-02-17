import {Component, inject} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {delay, of} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    // Angular
    ReactiveFormsModule,
    // Zorro imports
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.less',
  standalone: true,
})
export class Login {

  private readonly formBuilder = inject(NonNullableFormBuilder);

  isLoading: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  }, { updateOn: 'change' });

  submitLogin() {
    this.isLoading = true;

    of({ token: 'My little token' })
      .pipe(delay(1000))
      .subscribe((response: { token: string }) => {
        this.isLoading = false;
      })
  }

}
