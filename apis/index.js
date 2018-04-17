const express = require('express')
const router = express.Router()
const authority = require('./authority')
const user = require('./user')

router.use('/authority', authority)
router.use('/user', user)

module.exports = router
