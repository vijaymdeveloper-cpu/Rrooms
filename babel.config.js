module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@store': './src/store',
          '@components': './src/components',
          '@controllers': './src/controllers',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
