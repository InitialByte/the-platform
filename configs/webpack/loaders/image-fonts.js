module.exports = {
  test: /\.(gif|png|cur|jpg|webp|jpe?g|woff2?)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: require.resolve('url-loader'),
      options: {
        name: 'assets/[name].[hash:5].[ext]',
        limit: 1000,
      },
    },
  ],
};
