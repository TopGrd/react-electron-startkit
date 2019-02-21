module.exports = function babelConfig(api) {
  // https://babeljs.io/docs/en/config-files#apicache
  // api.cache(true)
  api.cache.using(() => process.env.NODE_ENV)

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-import-meta',
  ]

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: { electron: require('electron/package.json').version },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ]

  return {
    babelrc: false,
    plugins,
    presets,
  }
}
