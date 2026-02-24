import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, signal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {delay, finalize, of, tap} from 'rxjs';
import {ClientService} from '../_services/client.service';
import {UserService} from '../_services/user.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly clientService = inject(ClientService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly userService = inject(UserService);

  constructor() {
    console.log('login component constructor', this.userService.isLoggedIn(), this.userService.token())
  }

  // isLoading: boolean = false;
  loading = signal(false);

  // count = signal(5);
  // double = computed(() => this.count() * 2);


  loginForm: FormGroup = this.formBuilder.group({
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  }, { updateOn: 'change' });

  submitLogin() {
    // effect(() => {
    //   console.log('Signal changed', this.loading());
    // })

    // this.isLoading = true;
    this.loading.set(true);

    // of({ token: 'My little token' })
    //   .pipe(delay(1000))
    //   .subscribe((response: { token: string }) => {
    //     // this.isLoading = false;
    //     this.loading.set(false);
    //     // this.cdr.markForCheck();
    //   })

    this.clientService.login()
      .pipe(
        tap((response) =>  this.userService.saveToken(response.token)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((loginResponse) => {
        console.log(loginResponse);
        this.userService.saveToken(loginResponse.token);
      });

  }

}
