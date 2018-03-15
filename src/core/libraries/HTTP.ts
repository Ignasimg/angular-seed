import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Response, Headers, Http, RequestOptionsArgs, Request } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpConfig } from '../../config';
import { Cache } from './';

export interface ResponseMapper {
  mapeja: ((observable: Observable<Response>) => Observable<any>);
}

export interface iHttpConfig {
  baseUrl: string,
  API: string,
  cacheTTL: number,
}

@Injectable()
export class HTTP {

  private _numRequests: number = 0;
  public numRequests: Subject<number> = new Subject<number>();
  
  private _cache: Cache<Observable<any>>;
  
  public readonly baseUrl: string;
  public readonly baseAPI: string;
  public readonly APIurl: string;

  private _options = {headers: new Headers({'Content-Type': 'application/json'}), withCredentials: true};
  private _optionsCredentials = {withCredentials: true};

  
  constructor(
    private _http: Http, 
    @Inject(HttpConfig) private _config: iHttpConfig,
    //private _mapper: APIResponseMapper,
  ) 
  {
    this._cache = new Cache<Observable<any>>(this._config.cacheTTL);
    this.baseUrl = this._config.baseUrl;
    this.baseAPI = this._config.API;
    this.APIurl = this.baseUrl + this.baseAPI;
  }

  
  private _intercept(observable: Observable<Response>): Observable<any> {//Observable<APIresponse> {
    this.numRequests.next(++this._numRequests);
    //return this._mapper.mapeja(observable)
    //  .finally(() => this.numRequests.next(--this._numRequests));
    return observable.finally(() => this.numRequests.next(--this._numRequests));
  }

  private _mergeOptions(defaultOptions: RequestOptionsArgs, requestOptions: RequestOptionsArgs) {
    let options = {}
    for (var attrname in defaultOptions) 
      options[attrname] = defaultOptions[attrname];
    for (var attrname in requestOptions) 
      options[attrname] = requestOptions[attrname];
    return options;
  }
  
  cleanCache(): void {
    this._cache.clear();
  }

  invalidate(key: string, andChilds: boolean = false) {
    this._cache.invalidate(key, andChilds);
  }

  getNoCache(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.get(url, options, false);
  }

  get(url: string, options?: RequestOptionsArgs, getCachedResults: boolean = true): Observable<any> {
    let r: Observable<any>;
    if (getCachedResults && this._cache.has(url)) {
      return this._cache.get(url).delay(0);
    }
    else {
      let e = this._intercept(this._http.get(this.APIurl+url, this._mergeOptions(this._options, options))).map(
        (r) => {
          e = Observable.of(r).share();
          return r;
        }
      )
      .share();
      this._cache.set(url, e);
      
      return e;
    }
  }
  
  post(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    return this._intercept(this._http.post(this.APIurl+url, body, this._mergeOptions(this._options, options)));
  }
  
  put(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    return this._intercept(this._http.put(this.APIurl+url, body, this._mergeOptions(this._options, options)));
  }
  
  patch(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    return this._intercept(this._http.patch(this.APIurl+url, body, this._mergeOptions(this._options, options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this._intercept(this._http.delete(this.APIurl+url, this._mergeOptions(this._options, options)));
  }
}