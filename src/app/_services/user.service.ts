import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly TOKEN_KEY = 'sessionToken';

  private readonly _token = signal(this.getTokenFromLocalStorage());

  token = this._token.asReadonly();
  isLoggedIn = computed(() => this.token() !== null);

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this._token.set(token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._token.set(null);
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
