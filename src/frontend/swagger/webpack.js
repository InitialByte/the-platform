const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {join} = require('path');

const {buildInfo, collectSwaggerApi} = require('../../../configs/webpack/misc');
const {version, port} = require('./package.json');

const rootPath = process.cwd();
const baseRoot = join(rootPath, '/../../../');
const modules = collectSwaggerApi(baseRoot).filter(
  ({swagger}) => swagger !== null,
);

module.exports = {
  entry: {
    app: join(rootPath, 'src/index.js'),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('cache-loader'),
            options: {
              cacheDirectory: join(baseRoot, '.cache/cache-loader'),
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: join(baseRoot, '.cache/babel-loader'),
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
    ],
  },

  resolve: {
    cacheWithContext: false,
    extensions: ['.js'],
    symlinks: false,

    plugins: [PnpWebpackPlugin],
  },

  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },

  stats: 'errors-only',
  mode: 'production',
  devtool: false,
  watch: false,

  devServer: {
    liveReload: false,
    compress: false,
    hot: false,
    open: true,
    port,
  },

  output: {
    path: join(rootPath, 'dist'),
    filename: '[name].js',
    pathinfo: false,
    publicPath: '/',
  },

  optimization: {
    minimize: false,
  },

  performance: {
    hints: false,
  },

  plugins: [
    new CopyPlugin({
      patterns: modules.map(({swagger: from, moduleName}) => ({
        to: `${rootPath}/dist/swagger/${moduleName}.yaml`,
        from,
      })),
    }),

    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      lang: 'en-US',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        charset: {
          charset: 'utf-8',
        },
      },
      minify: {
        removeComments: false,
      },
      template: join(rootPath, 'public/index.html'),
      initialState: JSON.stringify(modules),
      buildInfo: buildInfo(version),
    }),
  ],
};
