import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { connect } from '@planetscale/database';
import { github } from '@lucia-auth/oauth/providers';

const { DATABASE_URL, SITE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PROD } = import.meta.env;

const connection = connect({
  url: DATABASE_URL,
});

export const auth = lucia({
  env: PROD ? 'PROD' : 'DEV',
  middleware: astro(),
  csrfProtection: PROD,
  adapter: planetscale(connection, {
    user: 'User',
    key: 'UserKey',
    session: 'UserSession',
  }),
  getUserAttributes(data) {
    return {
      username: data.username,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  redirectUri: `${SITE_URL}/api/login/github/callback`,
});

export type Auth = typeof auth;
