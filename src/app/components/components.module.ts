import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as exportedModalsObj from './modals';
let exportedModalsList = Object.keys(exportedModalsObj);
let modals: any[] = exportedModalsList.map((page: string) => exportedModalsObj[page]);

const components: any[] = [];

//const modals: any[] = [];

@NgModule({
  imports: [BrowserModule],
  exports: components,
  declarations: [components, modals],
  entryComponents: modals,
  providers: [],
})
export class ComponentsModule { }
