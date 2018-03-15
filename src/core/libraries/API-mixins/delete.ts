import { API, APIresponse } from '../';

export abstract class deletion extends API {
  delete(id: number | string) {
    return this._delete(encodeURIComponent(''+id))
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => {
        this._http.invalidate(this._api, true);
        return r.success;
      });
  }
}