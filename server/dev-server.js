/**
 *  This is the dev server only used in DEVELOPMENT
 *
 *  Default enables only the VueDevServer (equipped with HMR)
 *  if you want to enable other dev servers (may takes longer time)
 *  explicitly pass the argument `-- all`
 *
 *  Also, the dev server will be used by e2e test
 */

var express = require('express')
var chalk = require('chalk')
var serverDef = require('./../build/dev-server.def')

var app = express()
var port = serverDef.port
var vueDevServer = serverDef.app

// ASCII art of console message

var devMsg = `
    ____  _______    __   
   / __ \\/ ____/ |  / /   
  / / / / __/  | | / / 
 / /_/ / /___  | |/ /  
/_____/_____/  |___/   
`

// Share host url to different submodules
process.env.url = JSON.stringify(serverDef.url)

// Shows the message in console
console.log(chalk.green.bold(devMsg))

// Default enables vue-dev-server only
app.use('/', vueDevServer)

console.log('> Starting dev server...')
var server = app.listen(port)

module.exports = {
  ready: serverDef.ready,
  close: () => {
    server.close()
  }
}
