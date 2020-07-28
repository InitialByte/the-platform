const PnpWebpackPlugin = require('pnp-webpack-plugin');
const {join} = require('path');
const rootPath = process.cwd();

async function yarn2Config(config) {
  const newConfig = {
    ...(config || {}),
    resolve: {
      ...((config || {}).resolve || {}),
      plugins: [
        ...(((config || {}).resolve || {}).plugins || []),
        PnpWebpackPlugin
      ]
    },
    resolveLoader: {
      ...((config || {}).resolveLoader || {}),
      plugins: [
        ...(((config || {}).resolveLoader || {}).plugins || []),
        PnpWebpackPlugin.moduleLoader(module)
      ]
    }
  };

  newConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('cache-loader'),
        options: {
          cacheDirectory: join(rootPath, '/../../../.cache/cache-loader'),
        },
      },
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: join(rootPath, '/../../../.cache/babel-loader'),
          presets: [
            [
              '@babel/preset-env', {
                'useBuiltIns': 'entry',
              },
            ],
            '@babel/preset-typescript',
            [
              '@babel/preset-react', {
                useBuiltIns: true,
              },
            ],
          ],

          plugins: [
            [
              '@babel/proposal-class-properties',
              {
                loose: true,
              }
            ],
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-transform-function-name',
            '@babel/proposal-object-rest-spread',
          ],
        },
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  const jsRule = newConfig.module.rules.find(rule => rule.test.test('.js'));
  jsRule.exclude = /node_modules/;

  return newConfig;
}

async function managerEntries(entry = []) {
  return [
    ...entry,
    require.resolve('@storybook/addon-backgrounds/register'),
    require.resolve('@storybook/addon-viewport/register'),
    require.resolve('@storybook/addon-actions/register'),
    require.resolve('@storybook/addon-knobs/register'),
    require.resolve('@storybook/addon-a11y/register'),
  ];
}

module.exports = {
  managerWebpack: yarn2Config,
  webpack: yarn2Config,
  managerEntries,
};
