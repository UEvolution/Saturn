const express = require('express')
const router = express.Router()
const { sendSuccess, sendError } = require('../../util/util')
const articles = require('../../models/articles')

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10 }  = req.body.page || {}
  articles.findAndCountAll({ offset, limit })
    .then(r => {
      r.offset = offset
      r.limit = limit
      return res.json(sendSuccess(r))
    })
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/view', (req, res) => {
  articles.findOne({
    where: req.body
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id }  = req.body
  articles.update(req.body, {where: {id}})
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  articles.create(Object.assign(req.body, {author_id: req.user_data.data.id}))
    .then(r => res.json(sendSuccess(r, '创建成功')))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
