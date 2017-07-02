const express = require('express')
const router = express.Router()
const front = require('./front')
const manage = require('./manage')
const common = require('./common')

router.use('/front', front)
router.use('/manage', manage)
router.use('/common', common)

module.exports = router
