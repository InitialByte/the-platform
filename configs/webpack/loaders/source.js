module.exports = {
  test: /\.(pdf|zip|txt)$/,
  exclude: /node_modules/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024, // 4kb
    },
  },
};
