import { API, APIresponse } from '../';

export abstract class getById<O> extends API {
  getById(id: number | string) {
    return this._get(encodeURIComponent(''+id))
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => r.data as O);
  }
}