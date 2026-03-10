import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {simpleHttpInterceptor} from './_interceptors/simple-http-interceptor';
import {ConfigurationService} from './_services/configuration.service';
import {APP_CONFIG} from './_token/configuration.token';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      return inject(ConfigurationService).load()
    }),
    {
      provide: APP_CONFIG,
      useFactory: () => inject(ConfigurationService).config()
    },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([simpleHttpInterceptor])),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideZonelessChangeDetection(),
  ]
};
