import type { APIRoute } from 'astro';
import { lucia } from '@/lib/lucia';

export const POST: APIRoute = async ({ locals, params, cookies, redirect }) => {
  if (!locals.session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  await lucia.invalidateSession(locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(`/${params.lang}/`, 302);
};
