import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as pages from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: pages.WelcomePage },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), pages.PagesModule ],
  exports: [ RouterModule ],
  providers: [ ],
})
export class AppRoutingModule {}