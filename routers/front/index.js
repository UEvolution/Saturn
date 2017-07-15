const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')

router.use('/article', article)
router.use('/user', user)

module.exports = router
