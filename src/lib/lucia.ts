import { Lucia } from 'lucia';
import { GitHub } from 'arctic';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';

const { SITE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PROD } = import.meta.env;

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
  redirectURI: `${SITE_URL}/api/login/github/callback`,
});
