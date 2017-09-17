const express = require('express')
const log4js = require('log4js')
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config')
const routers = require('./routers')
const { sendNotFind, sendServerError } = require('./util/util')
const NODE_ENV = process.env.NODE_ENV || 'development'
const app = express()
const logger = log4js.getLogger('saturn')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'server string',
  resave: false,
  saveUninitialized: true
}))
app.use((req, res, next) => logger.info(`api ${req.method} router: ${req.url}`) & next())
app.use((err, req, res, next) => res.status(500).json(sendServerError))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, token')
  next()
})

app.use('/', routers)
app.post('*', (req, res) => res.json(sendNotFind()))

app.listen(config.port, err => err ? logger.error(err) : logger.info(`server online in ${config.port}`))
