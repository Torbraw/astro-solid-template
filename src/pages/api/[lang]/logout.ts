import type { APIRoute } from 'astro';
import { auth } from '@/lib/lucia';

export const POST: APIRoute = async ({ locals, params, redirect }) => {
  const session = await locals.auth.validate();
  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  await auth.invalidateSession(session.sessionId);
  locals.auth.setSession(null);
  return redirect(`/${params.lang}/`, 302);
};
