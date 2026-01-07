module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@constants': './src/constants',
            '@context': './src/context',
            '@pages': './src/pages',
            '@components': './src/pages/components',
            '@views': './src/pages/views',
            '@styles': './src/styles',
            '@utils': './src/utils/utils',
            '@services': './src/utils/services',
            '@hooks': './src/utils/hooks',
            '@handlers': './src/utils/handlers'
          },
        },
      ],
    ],
  };
};