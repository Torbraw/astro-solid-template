import { lucia } from './lib/lucia';
import { verifyRequestOrigin } from 'lucia';
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ cookies, locals, request }, next) => {
  if (request.method !== 'GET') {
    const originHeader = request.headers.get('Origin');
    const hostHeader = request.headers.get('Host');
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return new Response(null, {
        status: 403,
      });
    }
  }

  const sessionId = cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    locals.user = null;
    locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    //@ts-expect-error Waiting for update
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    //@ts-expect-error Waiting for update
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  locals.session = session;
  locals.user = user;
  return next();
});
