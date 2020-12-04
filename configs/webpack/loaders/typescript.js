const {join} = require('path');
const rootPath = process.cwd();

module.exports = {
  test: /\.tsx?$/,
  exclude: [
    /@babel\/runtime-corejs3/,
    /\bwebpack\/buildin\b/,
    /\/node_modules/,
    /\bcore-js\b/,
  ],
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        sourceType: 'unambiguous',
        cacheDirectory: join(rootPath, '.cache/babel-loader'),
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              bugfixes: true,
              modules: false,
              loose: true,
              corejs: {
                version: 3,
              },
              targets: [
                'last 2 Firefox versions',
                'last 2 Chrome versions',
                'last 2 Safari versions',
                'last 2 Edge versions',
              ],
            },
          ],
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
              useBuiltIns: true,
            },
          ],
        ],

        plugins: [
          [
            '@babel/proposal-class-properties',
            {
              loose: true,
            },
          ],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-transform-function-name',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/proposal-object-rest-spread',
        ],
      },
      // TODO possible install and replace to swc-loader.
      /*
      loader: require.resolve('swc-loader'),
      options: {
        // @link https://swc-project.github.io/docs/configuring-swc.html#jscparser
        jsc: {
          parser: {
            dynamicImport: true,
            syntax: 'typescript',
            decorators: false,
            tsx: true,
          },
          transform: {
            react: {
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              development: false,
              useBuiltins: false,
            },
          },
        },
      },
      */
    },
  ],
};
