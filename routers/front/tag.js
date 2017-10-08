const express = require('express')
const { sendSuccess, sendError, clearObject } = require('../../util/util')
const tags = require('../../models/tags')
const router = express.Router()

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10 }  = req.body.page || {}
  tags.findAndCountAll({ offset, limit })
    .then(r => {
      r.offset = offset
      r.limit = limit
      return res.json(sendSuccess(r))
    })
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/view', (req, res) => {
  let { id, title, alias, author } = req.body
  tags.findOne({
    where: clearObject({ id, title, alias, author, status: 21 })
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id, title, alias, bio } = req.body
  tags.update(
    clearObject({ id, title, alias, bio }),
    { where: { id } }
  )
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  let { id, title, alias, bio } = req.body
  tags.create(clearObject({ id, title, alias, bio }))
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
