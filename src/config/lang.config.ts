import { iLangConfig } from '../core/libraries';

export const CONFIG: iLangConfig = {
  /*
  *   Default language, 
  *   this will be used when there has been no language selected, 
  *   and for missing translations if fallback = true.
  */
  defaultLang: 'en',

  /*
  *   Fallback,
  *   In case there's a missing translation,
  *   use default language translation (true) or the translation key (false)
  */
  fallback: true,

  /*
  *   Placeholder,
  *   String to use as a placeholder for replacing in translation values.
  *
  *   For instance, for placeholder = '%'
  *   'Hello %0, %1'
  *   could be replaced by
  *   'Hello John, Doe'
  */
  placeholder: '%'
}