import { InjectionToken } from '@angular/core';

import * as C1 from './http.config';
import * as C2 from './lang.config';

export const HttpConfig = new InjectionToken('HTTP.CONFIG');
export const LangConfig = new InjectionToken('LANG.CONFIG');

export const CONFIG_PROVIDERS = [
  { provide: HttpConfig, useValue: C1.CONFIG },
  { provide: LangConfig, useValue: C2.CONFIG },
]