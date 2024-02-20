import { github, lucia } from '@/lib/lucia';
import { OAuth2RequestError } from 'arctic';
import type { APIRoute } from 'astro';
import { prisma } from '@/lib/prisma';

interface GitHubUser {
  id: number;
  login: string;
}

export const GET: APIRoute = async ({ cookies, url, redirect }) => {
  const lang = cookies.get('lang')?.value ?? 'en';
  const storedState = cookies.get('github_oauth_state')?.value;
  if (!storedState) return redirect(`/${lang}/`, 302);

  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');

  if (!state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser = (await githubUserResponse.json()) as GitHubUser;

    let userId = '';
    const existingUser = await prisma.user.findUnique({
      where: {
        githubId: githubUser.id,
      },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          githubId: githubUser.id,
          username: githubUser.login,
        },
      });
      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect(`/${lang}/home`, 302);
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
