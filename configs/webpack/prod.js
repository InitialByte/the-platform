const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {SourceMapDevToolPlugin} = require('webpack');
const {merge} = require('webpack-merge');
const {join} = require('path');

const {webpackConfig} = require('./config');

const rootPath = process.cwd();

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: false,

  output: {
    filename: '[name].[hash:5].js',
    pathinfo: false,
  },

  performance: {
    maxEntrypointSize: 3072000, // 3 MB
    maxAssetSize: 3072000, // 3 MB
    hints: 'error',
  },

  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        cache: join(rootPath, '.cache'),
        exclude: /\/node_modules/,
        sourceMap: true,
        parallel: true,
      }),
    ],

    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          test: /\/node_modules/,
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

    new BundleAnalyzerPlugin({
      reportFilename: join(rootPath, 'report/bundle.analyze.html'),
      analyzerMode: 'static',
      openAnalyzer: false,
    }),

    new CompressionPlugin({
      cache: join(rootPath, '.cache'),
      test: /\.(js|css|html|svg)$/,
      algorithm: 'gzip',
      threshold: 1024,
      minRatio: 1,
    }),

    new CompressionPlugin({
      cache: join(rootPath, '.cache'),
      test: /\.(js|css|html|svg)$/,
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
