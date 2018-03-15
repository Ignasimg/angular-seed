import { Type } from '@angular/core';
import { Modal } from './modal.component';

export interface iModal {
  id: string;
  titol: string;
  data: any;
  modal: Modal;
  open: () => void;
  close: () => void;
}

export abstract class BaseModal implements iModal {
  public data: any;
  abstract modal: Modal;

  private _titol: string = '[MISSING TITLE]';
  
  ngOnInit() {
    this.titol = this._titol;
  }

  open () {
    this.modal.open();
  }

  close () {
    this.modal.close();
  }

  get id() {
    return this.modal.id;
  }

  set id(v: string) {
    this.modal.id = v;
  }

  get titol() {
    if (this.modal)
      return this.modal.titol;
    return undefined;
  }

  set titol(v: string) {
    if (this.modal)
      this.modal.titol = v;
    this._titol = v;
  }
}

export class ModalRequest {
  constructor(public id: string, public component: Type<iModal>, public data: any) {}
}

export class ModalResult {
  constructor(public id: string, public result: any) {}
}
