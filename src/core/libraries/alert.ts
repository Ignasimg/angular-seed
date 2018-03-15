import { Injectable } from '@angular/core';

//import { APIresponse, explainError } from '../API';
import { APIresponse } from './API'
import { Language } from './language';

declare var swal: any;

@Injectable()
export class Alert {

  constructor (
    private _language: Language,
  ) {}
  
  confirm(title: string, text: string, confirmValue: string = 'Continuar', cancelValue: string = 'Cancelar'): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d7122b', //#3085d6',
        cancelButtonColor: '#d7122b', //'#d33',
        confirmButtonText: confirmValue,
        cancelButtonText: cancelValue,
      },
      function (isConfirm: boolean) {
        resolve(isConfirm);
      });
    });
  }
  
  success(title = '', text = '') {
    if (arguments.length == 1) this._success(this._language.instant('ALERT_SUCCESS_HEADER'), arguments[0]);
    if (arguments.length == 2) this._success(arguments[0], arguments[1]);
  }
  
  warning(title = '', text = '') {
    if (arguments.length == 1) this._warning(this._language.instant('ALERT_WARNING_HEADER'), arguments[0]);
    if (arguments.length == 2) this._warning(arguments[0], arguments[1]);
  }
  
  error(title = '', text = '') {
    if (arguments.length == 1) this._error(this._language.instant('ALERT_ERROR_HEADER'), arguments[0]);
    if (arguments.length == 2) this._error(arguments[0], arguments[1]);
  }

  serviceError(r:APIresponse) {
    if (!r.success)
      this._error(this._language.instant('ALERT_ERROR_HEADER'), this._language.instant(r.code, r.data))
  }
  
  private _success(title: string, text: string) {
    swal({title: title, text: text, type: 'success'});
  }
  
  private _warning(title: string, text: string) {
    swal({title: title, text: text, type: 'warning'});
  }
  
  private _error(title: string, text: string) {
    swal({title: title, text: text, type: 'error'});
  }
}