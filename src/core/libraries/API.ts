import { Observable } from 'rxjs';
import { HTTP, Alert } from './'

export interface APIresponse {
  success: boolean;
  code: string;
  data: any;
}

export abstract class API {
  constructor(
    protected _api: string,
    protected _http: HTTP,
    protected _alert: Alert,
  ) { }

  protected _get(subapi: string = '', options?: any): Observable<APIresponse> {
    return this._mapeja(this._http.get(this._api+'/'+subapi, options));
  }

  protected _post(subapi: string = '', body?: any, options?: any): Observable<APIresponse> {
    return this._mapeja(this._http.post(this._api+'/'+subapi, body, options))
      .do((r: APIresponse) => {
        if (r.success)
          this._http.invalidate(this._api, true);
      });
  }

  protected _put(subapi: string = '', body?: any, options?: any): Observable<APIresponse> {
    return this._mapeja(this._http.put(this._api+'/'+subapi, body, options))
      .do((r: APIresponse) => {
        if (r.success)
          this._http.invalidate(this._api, true);
      });
  }

  protected _patch(subapi: string = '', body?: any, options?: any): Observable<APIresponse> {
    return this._mapeja(this._http.patch(this._api+'/'+subapi, body, options))
      .do((r: APIresponse) => {
        if (r.success)
          this._http.invalidate(this._api, true);
      });
  }

  protected _delete(subapi: string = '', options?: any): Observable<APIresponse> {
    return this._mapeja(this._http.delete(this._api+'/'+subapi, options))
      .do((r: APIresponse) => {
        if (r.success)
          this._http.invalidate(this._api, true);
      });
  }

  private _mapeja (observable: Observable<any>): Observable<APIresponse> {
    return observable
      .map(r => {
        try {
          return r.json() as APIresponse;
        }
        catch (e) {
          return {success: false, code: 'API_UNHANDLED_ERROR', data: 'HTTP.service::APIresponse'};
        }
      })
      .catch(r => {
        try {
          return Observable.of(r.json() as APIresponse);
        }
        catch (e) {
          return Observable.of({success: false, code: 'API_UNHANDLED_ERROR', data: r.statusText});
        }
      })
      .do((r: APIresponse) => {
        if (!r.success)
          this._alert.serviceError(r);
      });
  }
}