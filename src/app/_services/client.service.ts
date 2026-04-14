import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private readonly http: HttpClient = inject(HttpClient);

  login(): Observable<{ token: string, name: string }> {
    return this.http.get<{ token: string, name: string }>('https://mocki.io/v1/6f7635cd-da2d-462f-9a64-36d72f3a9de4');
  }

}
