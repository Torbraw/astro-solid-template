module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.astro'],
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/no-unsafe-argument': ['warn'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'public',
    '.eslintrc.cjs',
    'prettier.config.cjs',
    'tailwind.config.cjs',
    'astro.config.mjs',
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: ['plugin:astro/recommended'],
      rules: {
        'astro/no-unused-css-selector': 'warn',
      },
    },
    {
      files: ['*.tsx'],
      plugins: ["solid"],
      extends: ['plugin:solid/typescript'],
    }
  ],
};
