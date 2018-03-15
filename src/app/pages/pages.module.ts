import { NgModule } from '@angular/core';

import * as exportedPagesObj from './';
let exportedPagesList = Object.keys(exportedPagesObj);
let pages = exportedPagesList.map((page: string) => exportedPagesObj[page]);

@NgModule({
  imports: [],
  exports: [],
  declarations: [ pages ],
  providers: [],
})
export class PagesModule { }
