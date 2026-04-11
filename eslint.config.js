import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['src/**/*.ts', '__tests__/**/*.ts'],
    plugins: {
      'import-x': importX,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],

      // 1. { } 内のメンバーをアルファベット順にソートする設定
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true, // 行の並び替えは import-x/order に任せるので true
          ignoreMemberSort: false, // ここを false にすることで { } 内をソート
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],

      // 2. インポート行全体の並び替え設定
      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['*.config.js', '*.config.ts', 'vitest-setup.ts'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    // 設定ファイルでも sort-imports だけは効かせておくと綺麗になります
    rules: {
      'sort-imports': ['warn', { ignoreDeclarationSort: true, ignoreMemberSort: false }],
    },
  },
);
