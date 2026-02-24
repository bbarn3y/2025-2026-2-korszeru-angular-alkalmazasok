import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private readonly http: HttpClient = inject(HttpClient);

  login(): Observable<{ token: string, name: string }> {
    return this.http.get<{ token: string, name: string }>('https://mocki.io/v1/e7e7c883-6102-4c02-afc6-527d1ffa3a18');
  }

}
