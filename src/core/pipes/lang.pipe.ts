import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../libraries/language';

@Pipe({
    name: 'Lang',
    pure: false // add in this line, update value when we change language
})
export class LangPipe implements PipeTransform {

    constructor(private _language: Language) { }

    transform(value: string, args: string | string[]): any { // args can be string or string array
      if (!value) return;
      return this._language.instant(value, args); // pass in args
    }
}