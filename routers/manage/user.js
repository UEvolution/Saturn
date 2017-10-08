const express = require('express')
const { sendSuccess, sendError } = require('../../util/util')
const users = require('../../models/users')
const router = express.Router()

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10 }  = req.body.page || {}
  users.findAndCountAll({ offset, limit })
    .then(r => {
      r.offset = offset
      r.limit = limit
      return res.json(sendSuccess(r))
    })
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/view', (req, res) => {
  users.findOne({
    where: req.body
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id }  = req.body
  users.update(req.body, {where: {id}})
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  users.create(req.body)
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
