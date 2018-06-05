const express = require('express')
const logger = require('log4js').getLogger('saturn')
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
app.use((req, res, next) => logger.info(`api ${req.method} router: ${req.url}`) & next())
app.use((err, req, res, next) => res.status(500).json(sendServerError))
app.use(formatError)

app.use(config.prefix, apis)
app.post('*', (req, res) => res.json(sendNotFind()))

app.listen(config.port, err => err ? logger.error(err) : logger.info(`[env ${mode}] server online in ${config.port}`))
