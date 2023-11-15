import { githubAuth } from '@/lib/lucia';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, params, redirect }) => {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  // store state
  cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: !import.meta.env.DEV,
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
