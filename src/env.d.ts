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

declare namespace App {
  interface Locals {
    session: import('lucia').Session | null;
    user: import('lucia').User | null;
  }
}
