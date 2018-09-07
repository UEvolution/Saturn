const express = require('express')
const router = express.Router()
const authority = require('./authority')
const article = require('./article')
const user = require('./user')
const tags = require('./tags')
const upload = require('./upload')

router.use('/authority', authority)
router.use('/article', article.router)
router.use('/user', user)
router.use('/tags', tags)
router.use('/upload', require('connect-multiparty')(), upload)

module.exports = router
