import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const { SITE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), '');
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'server',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    solidJs(),
  ],
  adapter: vercel()
});
