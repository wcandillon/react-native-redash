module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native-redash': '../src/index.ts',
        },
      },
    ],
  ],
};
