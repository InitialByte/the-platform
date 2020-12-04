const autoprefixer = require('autoprefixer');
const postcssJs = require('postcss-js');
const {CSSNamer} = require('../utils/css-namer');

const names = [];
const cssNamer = new CSSNamer();
const IS_PRODUCTION = ['production'].includes(process.env.NODE_ENV);

module.exports = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: {
          [!IS_PRODUCTION ? 'localIdentName' : 'getLocalIdent']: !IS_PRODUCTION
            ? '[folder]__[local]--[contenthash:5]'
            : (loaderContext, localIdentName, localName, options) => {
                if (!options.context) {
                  options.context = loaderContext.rootContext;
                }
                const request = path
                  .relative(options.context, loaderContext.resourcePath)
                  .replace(/\\/g, '/');

                options.content = `${
                  options.hashPrefix + request
                }+${localName}`;
                localIdentName = localIdentName.replace(
                  /\[local\]/gi,
                  localName,
                );

                const hash = loaderUtils.interpolateName(
                  loaderContext,
                  localIdentName,
                  options,
                );

                if (!names[hash]) {
                  names[hash] = cssNamer.getName(hash);
                }

                return names[hash];
              },
        },
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: false,
        plugins: [postcssJs, autoprefixer],
      },
    },
  ],
};
