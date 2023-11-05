import type { LangKeys } from './config';

export const ui = {
  fr: {
    login: 'Se connecter',
    logout: 'Se déconnecter',
    '404': '404 Page non trouvée',
    home: 'Accueil',
  },
  en: {
    login: 'Log in',
    logout: 'Log out',
    '404': '404 Page not found',
    home: 'Home',
  },
} as const satisfies Record<LangKeys, Record<string, string>>;
