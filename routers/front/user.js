const express = require('express')
const { sendSuccess, sendError, clearObject } = require('../../util/util')
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
  let { id, nice_name, email, role } = req.body
  users.findOne({
    where: clearObject({ id, nice_name, email, role, status: 21 })
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id, nice_name, email, role, avatar, bio } = req.body
  users.update(
    clearObject({ nice_name, email, role }),
    { where: { id } }
  )
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  let { id, nice_name, email, role, avatar, bio } = req.body
  users.create(clearObject({ nice_name, email, role, avatar, bio }))
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
