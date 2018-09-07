const express = require('express')
const signale = require('signale')
const bodyParser = require('body-parser')
const config = require('./config')
const apis = require('./apis')
const {
  sendNotFind,
  sendServerError,
  formatError,
  mode
} = require('./utils')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
if(mode === 'development') {
  app.use((req, res, next) => signale.watch(`api ${req.method} router: ${req.url}`) & next())
}
app.use((err, req, res, next) => res.status(500).json(sendServerError))
app.use(formatError)

app.use(config.prefix, apis)
app.post('*', (req, res) => res.json(sendNotFind()))

app.listen(config.port, err => err ? signale.fatal(new Error(err)) : signale.success(`[env ${mode}] server online in ${config.port}`))
