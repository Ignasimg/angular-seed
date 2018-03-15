import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule, CoreComponentsModule } from '../core';

import { AppComponent } from './app.component';

import * as Modals from './components/modals';

const modals = [
  Modals.WelcomeModal,
]

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
  ],
  exports: [],
  declarations: [ AppComponent, modals ],
  providers: [  ],
  entryComponents: [ modals ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
