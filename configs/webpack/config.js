const CircularDependencyPlugin = require('circular-dependency-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {join} = require('path');
const {writeFileSync} = require('fs');

const LoaderIMAGE_COMPRESS = require('./loaders/compress-images');
const LoaderIMAGES = require('./loaders/images');
const LoaderSOURCE = require('./loaders/source');
const LoaderTS = require('./loaders/typescript');
const LoaderFONTS = require('./loaders/fonts');
const LoaderCSS = require('./loaders/css');
const LoaderSVG = require('./loaders/svg');
const LoaderMJS = require('./loaders/mjs');
const {
  collectModuleRoutes,
  createCacheDir,
  collectI18n,
  buildInfo,
} = require('./misc');

const package = require('../../package.json');
const {name, version, config, description} = package;

const {
  APP = 'react/web-desktop',
  WORKSPACE = 'client',
  LANG = 'en-US',
  NODE_ENV = 'development',
} = process.env;
const rootPath = process.cwd();
const cachePath = join(rootPath, '.cache');

createCacheDir(cachePath);

const pathToSaveRoutes = join(cachePath, 'routes.ts');
const dependencies = config.app.dependencies.frontend[WORKSPACE] || [];
const moduleRoutes = collectModuleRoutes(rootPath, WORKSPACE, dependencies);
const i18nFolders = collectI18n(rootPath, WORKSPACE, dependencies, APP);
const i18nToCopy = i18nFolders.map(({moduleName, folder: from}) => {
  return {
    from,
    to: join(rootPath, `dist/i18n/${moduleName}`),
  };
});

const MAX_CYCLES = 5;
let numCyclesDetected = 0;

writeFileSync(pathToSaveRoutes, (moduleRoutes || []).join('\n'));

const webpackConfig = {
  context: join(rootPath, 'src'),
  target: 'web',
  bail: true,
  name,

  entry: [join(rootPath, `src/frontend/${APP}/src/index.tsx`)],

  output: {
    library: 'PLT',
    path: join(rootPath, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'dist/[contenthash:5][ext][query]',
  },

  module: {
    rules: [
      LoaderIMAGE_COMPRESS,
      LoaderIMAGES,
      LoaderSOURCE,
      LoaderFONTS,
      LoaderCSS,
      LoaderSVG,
      LoaderMJS,
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
      '@the_platform/routes': pathToSaveRoutes,
    },
  },

  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      onStart() {
        numCyclesDetected = 0;
      },
      onDetected({paths, compilation}) {
        numCyclesDetected++;
        compilation.warnings.push(new Error(paths.join(' -> ')));
      },
      onEnd({compilation}) {
        if (numCyclesDetected > MAX_CYCLES) {
          compilation.warnings.push(
            new Error(
              `Detected ${numCyclesDetected} cycles which exceeds configured limit of ${MAX_CYCLES}`,
            ),
          );
        }
      },
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),

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
      description,
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: false,
      },
      buildInfo: buildInfo(version),
      initialState: JSON.stringify({
        env: {
          workspace: WORKSPACE,
          mode: NODE_ENV,
        },
        i18n: {
          default: config.app.settings.defaultLanguage,
          available: config.app.settings.availableLanguages,
        },
        modules: {
          available: dependencies,
        },
      }),
    }),

    new CopyPlugin({
      patterns: [
        {
          from: join(rootPath, 'public/static/'),
          to: join(rootPath, 'dist/static'),
        },
        {
          from: join(rootPath, 'public/stuff/'),
          to: join(rootPath, 'dist'),
        },
        ...i18nToCopy,
      ],
    }),
  ],
};

module.exports.webpackConfig = webpackConfig;
