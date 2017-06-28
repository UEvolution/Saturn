const express = require('express')
const log4js = require('log4js')
const bodyParser = require('body-parser')
const config = require('./config')
const routers = require('./routers')
const NODE_ENV = process.env.NODE_ENV || 'development'
const app = express()
const logger = log4js.getLogger('saturn')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/article', routers.article)
app.post('*', (req, res) => {
	logger.error(`api ${req.method} router: ${req.url}`)
	res.json({
		msg: `this api undefined`,
		code: 400
	})
})

app.listen(config.port, err => err ? logger.error(err) : logger.info(`server online in ${config.port}`))
