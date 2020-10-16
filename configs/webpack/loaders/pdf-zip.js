module.exports = {
  exclude: /node_modules/,
  test: /\.(pdf|zip)$/,
  use: [
    {
      loader: require.resolve('url-loader'),
      options: {
        name: 'assets/[name].[hash:5].[ext]',
        limit: -1,
      },
    },
  ],
};
