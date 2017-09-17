const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')
const tag = require('./tag')

router.use('/article', article)
router.use('/user', user)
router.use('/tag', tag)

module.exports = router
