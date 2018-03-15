import { Component, OnInit } from '@angular/core';

import { ModalService, ModalRequest } from '@angular-seed/core';
import { WelcomeModal } from '@angular-seed/app/components';

@Component({
  templateUrl: 'welcome.template.html',
  styleUrls: ['./welcome.style.css'],
})
export class WelcomePage implements OnInit {
  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() { }

  modal() {
    this._modalService.openModal(new ModalRequest('modal-id', WelcomeModal, {foo: 'bar'}));
  }
}