# astro-solid-template

This is a template for an Astro project that use solid-js for the reactive components.

## Auth

Integrated auth with [lucia](https://lucia-auth.com/) and a github oauth2 provider. This template use a planetscale database to store the users with Prisma, but you can change the lucia adapter to use any other database & adapter. (Prisma schema is not in this repo).

We add a middleware to add user / auth info on each request, which we can use in our astro template. Also, we use the provided githubAuth functions to handle the oauth2 flow (see `src/pages/api/*`).

## i18n

You stock translations in `src/lib/i18n` and can use them in your components with the `useTranslations` function. You can also get the lang from the url with the `getLangFromUrl` function. You have the `language-select` component to switch between languages.

## Tailwind / Components

This template use tailwindcss with the [shadcn/ui](https://ui.shadcn.com/) theme & styles. You have the `ThemeToggle` component to switch between dark & light mode.

For components, we use [kobalte](https://kobalte.dev/) for the primitives and base our styles on shadcn/ui.

## Eslint / Prettier

We use eslint & prettier to format / validate the code. We recommended enabling auto format on save in your editor.
