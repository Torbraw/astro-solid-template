import type { LangKeys } from './config';

export const ui = {
  fr: {
    login: 'Se connecter',
    logout: 'Se déconnecter',
    '404': '404 Page non trouvée',
    home: 'Accueil',
    index: 'Index',
  },
  en: {
    login: 'Log in',
    logout: 'Log out',
    '404': '404 Page not found',
    home: 'Home',
    index: 'Index',
  },
} as const satisfies Record<LangKeys, Record<string, string>>;
