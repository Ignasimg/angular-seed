import { InjectionToken } from '@angular/core';

// import translations
import { LANG_CA_NAME, LANG_CA_CODE, LANG_CA_TRANS } from './lang-ca';
import { LANG_EN_NAME, LANG_EN_CODE, LANG_EN_TRANS } from './lang-en';

// translation token
export const TRANSLATIONS = new InjectionToken('translations');
export const LANGUAGES = new InjectionToken('languages');

// all translations
const dictionary = {
    [LANG_CA_CODE]: LANG_CA_TRANS,
    [LANG_EN_CODE]: LANG_EN_TRANS,
};

const langs = [
    {name: LANG_CA_NAME, code: LANG_CA_CODE},
    {name: LANG_EN_NAME, code: LANG_EN_CODE},
]

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];

export const LANGUAGES_PROVIDERS = [
    { provide: LANGUAGES, useValue: langs }
];