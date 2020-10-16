const {exec} = require('child_process');
const {merge} = require('webpack-merge');
const {join} = require('path');

const {webpackConfig} = require('./config');
const {killByPort} = require('./misc');
const {config} = require('../../package.json');
const {
  port: apiMockServerPort,
} = require('../../src/frontend/apimock/package.json');

const rootPath = process.cwd();
const {devServer, apiProxyServer} = config;
const {host, port} = devServer;
const {
  API_PROXY_TARGET = apiProxyServer.type === 'external'
    ? `${apiProxyServer.protocol}://${apiProxyServer.host}:${apiProxyServer.port}`
    : `https://localhost:${apiMockServerPort}`,
  TO_SMOKE = false,
} = process.env;

class ExtraWatchlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      'after-compile',
      ({contextDependencies}) => {
        console.log('\n Watching: ', contextDependencies.values());
        // contextDependencies = [];
        // Add an additional directory to watch.
        // contextDependencies.push(join(__dirname, 'path/to/directory'));
      },
    );
  }
}

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval',
  watch: !TO_SMOKE,

  output: {
    filename: '[name].bundle.js',
  },

  watchOptions: {
    ignored: [
      '**/*.js',
      '**/*.json',
      'node_modules/**',
      '.yarn/**',
      '.cache/**',
      'apimock/**',
      'swagger/**',
      'storybook/**',
      'smoke/**',
      'dist/**',
      'configs/**',
    ],
    aggregateTimeout: 1000,
    // TODO temp fix
    // poll: 1000,
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    runtimeChunk: 'single',
    splitChunks: false,
  },

  plugins: [new ExtraWatchlugin()],

  devServer: {
    contentBase: join(rootPath, 'dist'),
    disableHostCheck: true,
    https: true,
    host,
    port,

    cert: join(
      rootPath,
      'configs/docker/nginx/certs/wildcard.localhost.cert.pem',
    ),

    key: join(
      rootPath,
      'configs/docker/nginx/certs/wildcard.localhost.key.pem',
    ),

    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
        cookieDomainRewrite: '*',
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },

    before: async () => {
      // Kill if something is listen to the same port.
      killByPort(port);

      if (apiProxyServer.type === 'local') {
        killByPort(apiMockServerPort);
        // Run local apimock server if external proxy does not enabled.
        const {stdout, stderr} = await exec('yarn apimock');
      }
    },
  },
});
