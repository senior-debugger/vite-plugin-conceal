import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    'dist/*',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      quotes: ['error', 'single'],
    }
  },
  tseslint.configs.recommended,
]);
