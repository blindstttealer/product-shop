module.exports = {
  root: true, // чтобы ESLint не подхватывал настройки из родительских папок
  parser: '@typescript-eslint/parser', // парсер для TS
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // для React
    'plugin:@typescript-eslint/recommended', // для TS
    'plugin:prettier/recommended', // интеграция с Prettier
  ],
  settings: {
    react: {
      version: 'detect', // автоматически определять версию React
    },
  },
  rules: {
    'no-console': 'warn', // предупреждение при console.log
    '@typescript-eslint/no-unused-vars': ['warn'], // предупреждение при неиспользуемых переменных
    '@typescript-eslint/no-explicit-any': 'warn', // теперь any будет только предупреждением
    'react/prop-types': 'off', // отключаем проверку prop-types для TS
    'react/react-in-jsx-scope': 'off', // отключаем правило для новых версий React
    'react/display-name': 'off',
  },
};
