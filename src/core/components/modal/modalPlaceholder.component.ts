import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';

import { ModalHost } from './modal.directive';
import { iModal, ModalRequest, ModalResult } from './modal-model';
import { Modal } from './modal.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal-placeholder',
  template: `<div><ng-template modal-host></ng-template></div>`
})
export class ModalPlaceholderComponent implements AfterViewInit, OnDestroy {
  //@Input() modals: ModalItem[];
  modals: {request: ModalRequest, componentRef: ComponentRef<iModal>}[] = [];
  @ViewChild(ModalHost) modalHost: ModalHost;
  subscription: any;
  interval: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService,
  ) { }

  ngAfterViewInit() {
    this._modalService.modalOpen$
      .subscribe((request: ModalRequest) => {
        // If there are other modals...
        if (this.modals.length != 0)
          // First we hide the top (current) one
          this.modals[this.modals.length - 1].componentRef.instance.close();
        // Then open the requested one
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory<iModal>(request.component);

        let viewContainerRef = this.modalHost.viewContainerRef;
        //viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.id = request.id;
        componentRef.instance.data = request.data;
        // Push the new modal into the modal stack
        this.modals.push({request, componentRef});
      });
    
    this._modalService.modalFinish$
      .subscribe((request: ModalResult) => {
        // Get the index of the requested modal in the pending (open) modals array
        let index = this.modals.map((v: {request: ModalRequest, componentRef: ComponentRef<iModal>}) => v.request.id).lastIndexOf(request.id);

        if (index == -1)
          return;
        // Remove the requested modal from the array
        let [deleted] = this.modals.splice(index, 1);

        // Remove (destroy) the modal component
        deleted.componentRef.destroy();

        // Open previous element (if any)
        if (this.modals.length != 0)
          this.modals[this.modals.length - 1].componentRef.instance.open();
      })
  }

  ngOnDestroy() {
    //clearInterval(this.interval);
  }
}