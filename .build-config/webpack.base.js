const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const config = new Config()

// const notProduction = process.env.NODE_ENV !== 'production'

// config
//   .devtool('#cheap-module-eval-source-map')
//   .resolve
//     .alias.set('@', path.join(__dirname, '../src/renderer'))
//     .end()
//   .extensions
//     .merge(['.js', '.jsx', '.json', '.css'])
//     .end()
//   .end()
//   .node
//     .set('__dirname', notProduction)
//     .set('__filename', notProduction)
//     .end()
//   .plugin('minifyCss')
//   .use(MiniCssExtractPlugin, { filename: 'styles.css' })
//   .end()
//   .plugin('minifyCss')
//   .use(webpack.HotModuleReplacementPlugin)
//   .end()
//   .plugin('no-emit-on-error')
//   .use(webpack.NoEmitOnErrorsPlugin)
//   .end()
//   .when(notProduction, config => {
//     return config.plugin('define').use(webpack.DefinePlugin, [{
//       __static: `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`,
//     }])
//   })

// config
//   .module
//   .rule('lint')
//   .test(/\.(js|jsx)$/)
//   .pre()
//   .exclude(/node_modules/)
//   .use()

// const moduleConfig = {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       enforce: 'pre',
//       exclude: /node_modules/,
//       use: {
//         loader: 'eslint-loader',
//         options: {
//           formatter: require('eslint-friendly-formatter'),
//         },
//       },
//     },
//     {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//       },
//     },
//     {
//       test: /\.css$/,
//       use: ['style-loader', 'css-loader'],
//     },
//     {
//       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//       use: {
//         loader: 'url-loader',
//         query: {
//           limit: 10000,
//           name: 'imgs/[name]--[folder].[ext]',
//         },
//       },
//     },
//     {
//       test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
//       loader: 'url-loader',
//       options: {
//         limit: 10000,
//         name: 'media/[name]--[folder].[ext]',
//       },
//     },
//     {
//       test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//       use: {
//         loader: 'url-loader',
//         query: {
//           limit: 10000,
//           name: 'fonts/[name]--[folder].[ext]',
//         },
//       },
//     },
//   ],
// }

      
let baseConfig = {
  devtool: '#cheap-module-eval-source-map',
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
    },
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]',
          },
        },
      },
    ],
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

/**
 * Adjust config for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`,
    }),
  )
}

module.exports = baseConfig
