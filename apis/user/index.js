const express = require('express')
const router = express.Router()
const create = require('./create')
const destroy = require('./destroy')
const view = require('./view')

router.use('/create', create)
router.use('/destroy', destroy)
router.use('/view', view)

module.exports = router
