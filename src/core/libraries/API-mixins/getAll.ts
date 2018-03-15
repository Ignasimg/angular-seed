import { API, APIresponse } from '../';

export abstract class getAll<O> extends API {
  getAll() {
    return this._get()
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => r.data as O[]);
  }
}