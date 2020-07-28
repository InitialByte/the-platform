const autoprefixer = require('autoprefixer');
const postcssJs = require('postcss-js');

module.exports = {
  test: /\.css$/,
  exclude: /\/node_modules/,
  use: [
    {
      loader: require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        // TODO
        // localIdentName: isDev
        //  ? '[path][name][local]'
        //  : '[name][local][hash:base64:5]'
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
        plugins: [
          postcssJs,
          autoprefixer,
        ],
      },
    },
  ],
};
