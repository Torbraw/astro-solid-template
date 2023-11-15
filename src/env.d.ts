/// <reference types="astro/client" />
/// <reference types="lucia" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace Lucia {
  type Auth = import('./lib/lucia').Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  type DatabaseSessionAttributes = {};
}

declare namespace App {
  interface Locals {
    auth: import('lucia').AuthRequest;
  }
}
