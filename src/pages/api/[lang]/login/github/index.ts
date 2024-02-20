import { github } from '@/lib/lucia';
import { generateState } from 'arctic';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, params, redirect }) => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  // store state
  cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: 60 * 60,
  });
  cookies.set('lang', params.lang as string, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 60 * 60,
  });

  return redirect(url.toString(), 302);
};
