import {InjectionToken} from '@angular/core';
import {Configuration} from '../_models/configuration.model';

export const APP_CONFIG = new InjectionToken<Configuration>('APP_CONFIG');
