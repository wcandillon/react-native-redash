import reactNativeWcandillon from 'eslint-config-react-native-wcandillon';
import importPlugin from 'eslint-plugin-import';

export default [
  ...reactNativeWcandillon,
  {
    ignores: ['lib/**/*', '*.js'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-bitwise': 0,
      'import/extensions': [
        2,
        {
          extensions: ['.ts', '.tsx'],
        },
      ],
      'import/no-named-as-default-member': 0,
      'import/no-default-export': 0, // Allow default exports for components
    },
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
];