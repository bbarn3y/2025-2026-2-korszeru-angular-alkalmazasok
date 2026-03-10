import {inject, Injectable, signal} from '@angular/core';
import {Configuration} from '../_models/configuration.model';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  private readonly http: HttpClient = inject(HttpClient);

  private readonly _config = signal<Configuration | null>(null);
  readonly config = this._config.asReadonly();

  async load(): Promise<Configuration> {
    const existingConfig = this._config();
    if (existingConfig) return existingConfig;

    const config = await firstValueFrom(
      this.http.get<Configuration>('/assets/configuration.json')
    );

    this._config.set(config);
    return config;
  }

}
