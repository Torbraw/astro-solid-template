export const LANGUAGES = {
  fr: 'Français',
  en: 'English',
} as const;

export const DEFAULT_LANGUAGE = 'en' satisfies LangKeys;

export type LangKeys = keyof typeof LANGUAGES;
