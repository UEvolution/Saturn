const express = require('express')
const log4js = require('log4js')
const bodyParser = require('body-parser')
const config = require('./config')
const apis = require('./apis')
const { sendNotFind, sendServerError } = require('./utils')
const { mode } = require('./utils')
const app = express()
const logger = log4js.getLogger('saturn')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => logger.info(`api ${req.method} router: ${req.url}`) & next())
app.use((err, req, res, next) => res.status(500).json(sendServerError))

app.use(config.prefix, apis)
app.post('*', (req, res) => res.json(sendNotFind()))

app.listen(config.port, err => err ? logger.error(err) : logger.info(`[env ${mode}] server online in ${config.port}`))
