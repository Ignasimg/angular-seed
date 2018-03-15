import { API, APIresponse } from '../';

export abstract class search<O> extends API {
  search(term: string) {
    return this._get('?s='+encodeURIComponent(term))
      .filter((r: APIresponse) => r.success)
      .map((r: APIresponse) => r.data as O);
  }
}