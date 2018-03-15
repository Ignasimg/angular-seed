import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BaseModal, Modal, ModalService } from '../../../../core';

@Component ({
  templateUrl: 'welcome.template.html',
  styleUrls: ['./welcome.style.css']
})
export class WelcomeModal extends BaseModal implements AfterViewInit {
  @ViewChild(Modal) modal: Modal;

  constructor (
    private _modalService: ModalService
  ) {
    super();
  }

  ngAfterViewInit() {
    //this.modal.resize();
    this.modal.open();
  }
}