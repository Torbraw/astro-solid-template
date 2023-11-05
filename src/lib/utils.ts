import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type LangKeys, LANGUAGES, DEFAULT_LANGUAGE } from './config';
import { ui } from './i18n';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as LangKeys;
  return DEFAULT_LANGUAGE;
};

export const useTranslations = (lang: LangKeys) => {
  return function t(key: keyof (typeof ui)[typeof DEFAULT_LANGUAGE]) {
    return ui[lang][key];
  };
};
