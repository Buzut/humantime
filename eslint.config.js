import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, jsdoc, stylistic },
    extends: ['js/recommended', 'jsdoc/recommended'],
    rules: {
      'stylistic/indent': ['error', 2], // 2-space indentation
      'stylistic/quotes': ['error', 'single'], // Single quotes
      'stylistic/semi': ['error', 'always'], // Require semicolons
      'stylistic/comma-dangle': ['error', 'never'], // No trailing commas
      'stylistic/no-trailing-spaces': 'error', // Disallow trailing whitespace
      'stylistic/max-len': ['warn', { 'code': 120 }] // Max line length of 100 (optional)
    }
  },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser } }
]);
