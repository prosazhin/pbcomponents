import eslint from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwind from 'eslint-plugin-tailwindcss';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  prettierRecommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/base'],
  ...vue.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  {
    ignores: ['dist', 'node_modules', '**/*.config.js', '**/*.d.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    plugins: {
      'typescript-eslint': tseslint.plugin,
      prettier: prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: {
          js: 'espree',
          jsx: 'espree',
          ts: tseslint.parser,
          tsx: tseslint.parser,
        },
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    settings: {
      vue: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['clsx'],
        config: 'tailwind.config.js',
        cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist'],
        removeDuplicates: true,
        skipClassAttribute: false,
        classRegex: '^class(Name)?$',
      },
    },
    rules: {
      curly: 'error',
      'no-shadow': 'error',
      'no-nested-ternary': 'warn',
      'newline-before-return': 'error',
      'object-shorthand': 'error',
      'spaced-comment': 'error',
      quotes: ['error', 'single'],
      'no-duplicate-imports': 'error',
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'vue/script-indent': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  configPrettier,
);
