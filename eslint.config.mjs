import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      '.env',
      'README.md',
      '.husky/',
      '.github',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
  },
  tseslint.configs.recommended,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'no-console': 'error',
      eqeqeq: ['warn', 'always'],
      semi: ['warn', 'always'],
      quotes: ['warn', 'single'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prettier/prettier': 'error',
    },
  },
]);
