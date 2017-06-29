const express = require('express')
const log4js = require('log4js')
const bodyParser = require('body-parser')
const config = require('./config')
const routers = require('./routers')
const { sendNotFind } = require('./util/util')
const NODE_ENV = process.env.NODE_ENV || 'development'
const app = express()
const logger = log4js.getLogger('saturn')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => logger.info(`api ${req.method} router: ${req.url}`) & next())

app.use('/article', routers.article)
app.post('*', (req, res) => {
	res.json(sendNotFind())
})

app.listen(config.port, err => err ? logger.error(err) : logger.info(`server online in ${config.port}`))
