module.exports = {
  test: /\.(gif|png|jpe?g|webp)$/,
  loader: 'image-webpack-loader',
  enforce: 'pre',
  options: {
    mozjpeg: {
      progressive: true,
      quality: 65,
    },
    optipng: {
      enabled: false,
    },
    pngquant: {
      quality: [0.65, 0.90],
      speed: 4,
    },
    gifsicle: {
      interlaced: false,
    },
    webp: {
      quality: 75,
    },
  },
};
