const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {SourceMapDevToolPlugin} = require('webpack');
const {merge} = require('webpack-merge');
const {webpackConfig} = require('./config');

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: false,
  cache: false,

  output: {
    filename: '[id].[contenthash:5].js',
    pathinfo: false,
  },

  performance: {
    maxEntrypointSize: 1024000, // 1 MB
    maxAssetSize: 1024000, // 1 MB
    hints: 'error',
  },

  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        parallel: true,
      }),
    ],

    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    // Exclude source map for vendors chunk.
    new SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      exclude: /vendors*/,
    }),

    new CompressionPlugin({
      test: /\.(js|css|html|svg|json)$/,
      algorithm: 'gzip',
      threshold: 1024,
      minRatio: 1,
    }),

    new CompressionPlugin({
      test: /\.(js|css|html|svg|json)$/,
      algorithm: 'brotliCompress',
      filename: '[path][base].br',
      deleteOriginalAssets: false,
      threshold: 1024,
      minRatio: 1,
      compressionOptions: {
        level: 11,
      },
    }),
  ],
});
