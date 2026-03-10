import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {UserService} from '../_services/user.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const simpleHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  // if (userService.isLoggedIn()) {
    const authReq = req.clone({
      headers: new HttpHeaders({Authorization: `Bearer ${userService.token()}`})
    });
  // }

  return next(authReq)
    .pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          userService.removeToken();
        }
        return throwError(() => err);
      })
    );
};
