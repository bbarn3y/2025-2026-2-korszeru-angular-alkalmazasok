import {computed, inject, Injectable, signal} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly TOKEN_KEY = 'sessionToken';

  private readonly cookieService: CookieService = inject(CookieService);

  private readonly _token = signal(this.getTokenFromLocalStorage());

  token = this._token.asReadonly();
  isLoggedIn = computed(() => !!this.token());

  saveToken(token: string) {
    // localStorage.setItem(this.TOKEN_KEY, token);
    this.cookieService.set(this.TOKEN_KEY, token);
    this._token.set(token);
  }

  removeToken() {
    // localStorage.removeItem(this.TOKEN_KEY);
    this.cookieService.delete(this.TOKEN_KEY);
    this._token.set('');
  }

  private getTokenFromLocalStorage(): string | null {
    // return localStorage.getItem(this.TOKEN_KEY);
    return this.cookieService.get(this.TOKEN_KEY);
  }

}
