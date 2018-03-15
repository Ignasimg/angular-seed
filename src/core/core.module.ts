import { NgModule } from '@angular/core';

import { LANGUAGES_PROVIDERS, TRANSLATION_PROVIDERS } from './lang';
import { CONFIG_PROVIDERS } from '../config';

import { Language } from './libraries/language';
import { LangPipe } from './pipes/lang.pipe';

//import { TestService } from './libraries/test';

import { CoreComponentsModule } from './components';

@NgModule({
  imports: [ CoreComponentsModule ],
  exports: [ CoreComponentsModule ],
  declarations: [ ],
  providers: [ CONFIG_PROVIDERS, LANGUAGES_PROVIDERS, TRANSLATION_PROVIDERS, Language, ],
})
export class CoreModule { }
