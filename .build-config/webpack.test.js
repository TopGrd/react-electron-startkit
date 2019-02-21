const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./webpack.base')
const { dependencies } = require('../package.json')

let whiteListedModules = []

config
  .entry('renderer')
  .add(path.join(__dirname, '../src/renderer/index.js'))
  .end()
  .output.filename('[name].js')
  .path(path.join(__dirname, '../dist/electron'))
  .libraryTarget('commonjs2')
  .end()
  .externals([...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))])
  .plugin('html')
  .use(HtmlWebpackPlugin, [
    {
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      nodeModules: process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, '../node_modules') : false,
    },
  ])
  .end()
  .when(process.env.NODE_ENV === 'production', config => {
    return config
      .plugin('copy')
      .use(CopyWebpackPlugin, [
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist/electron/static'),
          ignore: ['.*'],
        },
      ])
      .end()
      .plugin('define')
      .use(webpack.DefinePlugin, {
        'process.env.NODE_ENV': '"production"',
      })
      .end()
      .plugin('loader-options')
      .use(webpack.LoaderOptionsPlugin, {
        minimize: true,
      })
  })
  .target('electron-renderer')


module.exports = config.toConfig()
