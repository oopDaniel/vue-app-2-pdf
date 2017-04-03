var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

let settings
try {
  settings = require('../settings_local')
} catch (e) {
  settings = require('../settings')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@services': resolve('src/services'),
      '@styles': resolve('src/styles'),
      '@constants': resolve('src/shared/constants'),
      '@utils': resolve('src/shared/utils'),
      '@mixins': resolve('src/mixins'),
      '@plugins': resolve('src/plugins'),
      'jspdf': 'jspdf/dist/jspdf.debug',
      'html2canvas': 'html2canvas/dist/html2canvas'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ resolve('src'), resolve('test') ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_VARIABLE_API_SERVER:
        JSON.stringify(settings.API_SERVER),
      WEBPACK_VARIABLE_STRIPE_PUBLIC_KEY:
        JSON.stringify(settings.STRIPE_PUBLIC_KEY),
      WEBPACK_VARIABLE_SEGMENT_API_KEY:
        JSON.stringify(settings.SEGMENT_API_KEY)
    }),
    new webpack.ProvidePlugin({
      'html2canvas': 'html2canvas'
    })
  ]

}
