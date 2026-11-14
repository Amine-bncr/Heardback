import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  react.configs['recommended'],
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
      },
    },
    rules: {
      // Strictness the brief asks for.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-bind': 'warn',
      'react/prop-types': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', 'functions/**'],
  },
)