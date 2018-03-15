import { API, APIresponse } from '../';

export abstract class create<O> extends API {
  create(obj: O) {
    return this._post('', obj)
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => {
        this._http.invalidate(this._api, true);
        return r.data;
      });
  }
}