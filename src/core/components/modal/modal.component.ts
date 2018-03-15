import {Input, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding} from '@angular/core';

import { ModalService } from './modal.service';
import { ModalResult } from './modal-model';

declare var jQuery: any;

@Component({
  selector: 'modal',
  templateUrl: 'modal.template.html',
  styleUrls: ['./modal.style.css'],
})
export class Modal implements OnInit, AfterViewInit {

  @ViewChild('modal') holder: ElementRef;
  @HostBinding('id') id: string;


  public titol: string;

  public data: any = {};

  private _modal: any;

  constructor(
    private _modalService: ModalService
  ) {
  }

  open() {
    this._modal.modal('show');
  }

  close() {
    this._modal.modal('hide');
  }

  extinguish() {
    this.close();
    this._modalService.finishModal(new ModalResult(this.id, {}));
  }

  resize() {
  //  this._modal.data('bs.modal')._handleUpdate();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._modal = jQuery(this.holder.nativeElement).modal({
      backdrop: 'static',
      keyboard: true,
      focus: true,
      show: false
    });
  }
}