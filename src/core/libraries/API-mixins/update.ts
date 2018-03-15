import { API, APIresponse } from '../';

export abstract class update<O> extends API {
  update(id: number | string, obj: O) {
    return this._post(encodeURIComponent(''+id), obj)
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => {
        this._http.invalidate(this._api, true);
        return r.success;
      });
  }
}