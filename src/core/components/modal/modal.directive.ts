import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modal-host]',
})
export class ModalHost {
  constructor(public viewContainerRef: ViewContainerRef) { }
}