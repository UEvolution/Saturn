const express = require('express')
const router = express.Router()
const authority = require('./authority')

router.use('/authority', authority)

module.exports = router
