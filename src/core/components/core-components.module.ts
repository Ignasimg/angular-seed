import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Modal, ModalHost, ModalPlaceholderComponent, ModalService } from './modal';

@NgModule({
  imports: [ BrowserModule, RouterModule, FormsModule ],
  exports: [ Modal, ModalHost, ModalPlaceholderComponent ],
  declarations: [ Modal, ModalHost, ModalPlaceholderComponent ],
  providers: [ ModalService ],
})
export class CoreComponentsModule { }