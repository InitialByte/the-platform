const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {join} = require('path');
const {readFileSync, writeFileSync} = require('fs');

const LoaderIMAGE_COMPRESS = require('./loaders/compress-images');
const LoaderIMAGE_FONTS = require('./loaders/image-fonts');
const LoaderPZF_ZIP = require('./loaders/pdf-zip');
const LoaderTS = require('./loaders/typescript');
const LoaderCSS = require('./loaders/css');
const LoaderSVG = require('./loaders/svg');
const {buildInfo, collectModuleRoutes, createCacheDir} = require('./misc');

const {name, version, config} = require('../../package.json');

const {
  APP = 'react/web-desktop',
  WORKSPACE = 'client',
  LANG = 'en-US',
} = process.env;
const rootPath = process.cwd();
const cachePath = join(rootPath, '.cache');

createCacheDir(cachePath);

const pathToSaveRoutes = join(cachePath, 'routes.ts');
const dependencies = config.app.dependencies.frontend[WORKSPACE] || [];
const moduleRoutes = collectModuleRoutes(
  rootPath,
  WORKSPACE,
  dependencies,
).map((routeFile) => readFileSync(routeFile, 'utf8'));

writeFileSync(pathToSaveRoutes, (moduleRoutes || []).join('\n'));

const webpackConfig = {
  context: join(rootPath, 'src'),
  target: 'web',
  bail: true,
  name,

  entry: [join(rootPath, `src/frontend/${APP}/src/index.tsx`)],

  output: {
    path: join(rootPath, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      LoaderIMAGE_COMPRESS,
      LoaderIMAGE_FONTS,
      LoaderPZF_ZIP,
      LoaderCSS,
      LoaderSVG,
      LoaderTS,
    ],
  },

  stats: {
    moduleAssets: false,
    entrypoints: false,
    logging: 'verbose',
    children: false,
    assets: false,
    colors: true,
    hash: false,
    env: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    cacheWithContext: false,
    symlinks: false,

    alias: {
      '@the_platform/react-web-desktop': join(
        rootPath,
        'src/frontend/react/web-desktop/src',
      ),
      '@the_platform/module-register': join(
        rootPath,
        'src/frontend/modules/register/src',
      ),
      '@the_platform/nodejs-core': join(
        rootPath,
        'src/backend/nodejs/rest/core/src',
      ),
      '@the_platform/module-auth': join(
        rootPath,
        'src/frontend/modules/auth/src',
      ),
      '@the_platform/react-uikit': join(
        rootPath,
        'src/frontend/react/uikit/src',
      ),
      '@the_platform/core': join(rootPath, 'src/frontend/core/src'),
      '@the_platform/routes': pathToSaveRoutes,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: join(rootPath, 'public/favicon.ico'),
      template: join(rootPath, 'public/index.html'),
      lang: LANG,
      meta: {
        charset: {
          charset: 'utf-8',
        },
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      title: name,
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: false,
      },
      buildInfo: buildInfo(version),
    }),

    new CopyPlugin({
      patterns: [
        {
          from: join(rootPath, 'public/static/'),
          to: join(rootPath, 'dist/static'),
        },
        {
          from: join(rootPath, 'public/stuff/'),
          to: join(rootPath, 'dist/'),
        },
      ],
    }),
  ],
};

module.exports.webpackConfig = webpackConfig;
