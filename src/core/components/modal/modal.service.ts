import { Injectable }           from '@angular/core';
import { Subject }              from 'rxjs/Subject';
import { ModalRequest, ModalResult }            from './modal-model';

@Injectable()
export class ModalService {
  // Observable sources
  private modalOpenRequest = new Subject<ModalRequest>();
  private modalFinishResult = new Subject<ModalResult>();
 
  // Observable streams
  modalOpen$ = this.modalOpenRequest.asObservable();
  modalFinish$ = this.modalFinishResult.asObservable();
 
  // Service message commands
  openModal(modal: ModalRequest) {
    this.modalOpenRequest.next(modal);
  }
 
  finishModal(result: ModalResult) {
    this.modalFinishResult.next(result);
  }
}
