import { Injectable, Inject, EventEmitter } from '@angular/core';
import { LANGUAGES, TRANSLATIONS } from '../lang'; // import our opaque token
import { LangConfig } from '../../config';

//import { Idioma, IdiomaService, Lang, LangService } from '../services';
//import { Idioma, IdiomaService } from '../services/idioma';
//import { Lang, LangService } from '../services/lang';

import { Subject } from 'rxjs';

export interface iLangConfig {
  defaultLang: string;
  fallback: boolean;
  placeholder: string;
}

@Injectable()
export class Language {
  private _defaultLang: string;
  private _fallback: boolean;
  private _currentLang: string;

  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

  public get availableLanguages() {
    return this._languages;
  }

  public get currentLang() {
    return (this._translations[this._currentLang] && this._currentLang) || this._defaultLang;
  }

  public setDefaultLang(lang: string) {
    this._defaultLang = lang; // set default lang
  }

  public enableFallback(enable: boolean) {
    this._fallback = enable; // enable or disable fallback language
  }


  /*
  private _languages: {name: string, code: string}[] = [];
  private _translations: {
    [langCode: string]: {
      [marcador: string]: string;
    }
  } = {};
  */

  constructor(
    @Inject(LANGUAGES) private _languages: {name: string, code: string}[],
    @Inject(TRANSLATIONS) private _translations: {[langCode: string]: {[marcador: string]: string}},
    @Inject(LangConfig) private _config: iLangConfig,

    //private _idiomaService: IdiomaService,
    //private _langService: LangService,
  ) {
    this.setDefaultLang(this._config.defaultLang);
    this.enableFallback(this._config.fallback);

    /*
    this._idiomaService.getAll()
      .map((idiomes: Idioma[]) => 
        idiomes.map((idioma: Idioma) => ({name: idioma.$value, code: idioma.$key})))
      .take(1)
      .subscribe((v: {name: string, code: string}[]) => {
        this._languages = v;
      });

    this._langService.getAll()
      .subscribe((langs: Lang[]) => {
        this._translations = langs.reduce((p: any, c: Lang, i: number, a: Lang[]) => {
          p[c.$key] = c;
          return p;
        }, {});
      });
    */
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
    this.onLangChanged.emit(lang); // publish changes
  }

  private translate(key: string): string {
    let translation = key;

    // found in current language
    if (this._translations[this.currentLang] && (this._translations[this.currentLang][key] != undefined)) {
      return this._translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this._fallback) { 
      return translation;
    }

    // found in default language
    if (this._translations[this._defaultLang] && (this._translations[this._defaultLang][key] != undefined)) {
      return this._translations[this._defaultLang][key];
    }

    // not found
    return translation;
  }

  public instant(key: string, words?: string | string[]) {
    const translation: string = this.translate(key);

    if (!words) return translation;
    return this.replace(translation, words);
  }

  public replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this._config.placeholder.concat(<any>i), e);
    });

    return translation;
  }
}