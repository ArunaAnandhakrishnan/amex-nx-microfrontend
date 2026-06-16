import nxEslintPlugin from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    plugins: { '@nx': nxEslintPlugin },
  },
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser, parserOptions: { project: ['./tsconfig.base.json'] } },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            { sourceTag: 'type:app',    onlyDependOnLibsWithTags: ['type:lib'] },
            { sourceTag: 'type:lib',    onlyDependOnLibsWithTags: ['type:lib'] },
            { sourceTag: 'scope:shell', onlyDependOnLibsWithTags: ['scope:shared'] },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
];
