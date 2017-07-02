const express = require('express')
const users = require('../../models/users')
const router = express.Router()

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10}  = req.body.page || {}
  users.findAndCountAll({ offset, limit })
    .then(r => res.json(r))
})

router.post('/view', (req, res) => {
  users.findOne({
    where: req.body
  })
    .then(r => res.json(r))
})

router.post('/create', (req, res) => {
  users.create(req.body)
    .then(r => res.json(r))
})

module.exports = router
