/**
 * Use in development env
 * Installs `electron-debug` & `react-devtools`
 */
const debug = require('electron-debug')

/* eslint-disable */
// close devtools security warinings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
// Install `electron-debug` with `devtron`
debug({ showDevTools: true, enabled: true })

// Install `react-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension
    .default(installExtension.REACT_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `react-devtools`: \n', err)
    })
})

require('./index')
