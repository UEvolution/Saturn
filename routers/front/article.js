const express = require('express')
const router = express.Router()
const { sendSuccess, sendError, clearObject, bulkList } = require('../../util/util')
const articles = require('../../models/articles')
const users = require('../../models/users')
const tags = require('../../models/tags')
const article_tag = require('../../models/article_tag')

const articlesUsers = articles.belongsTo(users, {foreignKey: 'author_id', as: 'author'})

articles.belongsToMany(tags, { through: article_tag, foreignKey: 'article_id' })
tags.belongsToMany(articles, { through: article_tag, foreignKey: 'tag_id' })

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10 }  = req.body.page || {}
  articles.findAndCountAll({ offset, limit, include: [articlesUsers, tags] })
    .then(r => {
      r.offset = offset
      r.limit = limit
      return res.json(sendSuccess(r))
    })
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/view', (req, res) => {
  let { id, title, author_id, alias } = req.body
  articles.findOne({
    where: clearObject({ id, title, author_id, alias, status: 21 }),
    include: [ articlesUsers, tags ]
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id, title, alias, excerpt, content, relate, pic, tag = [] }  = req.body
  article_tag.destroy({
    where: { article_id: id },
    force: false
  })
    .then(r => article_tag.bulkCreate(bulkList(id, tag)))
    .then(articles.update(
      clearObject({ title, alias, excerpt, content, relate, pic }),
      { where: { id }, include: [ articlesUsers ] }
    ))
    .then(() => articles.findOne({ where: clearObject({ id, alias }), include: [ articlesUsers, tags ] }))
    .then(r => res.json(sendSuccess(r, '修改成功')))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  let { title, alias, excerpt, content, relate, pic, tag = [] }  = req.body
  if (!req.user_data) {
    res.json(sendError(undefined, '请先登录'))
    return
  }
  articles.create(clearObject({ title, alias, excerpt, content, relate, pic, author_id: req.user_data.data.id }))
    .then(r => {
      article_tag.bulkCreate(bulkList(r.id, tag))
      return r.id
    })
    .then(id => articles.findOne({ where: { id }, include: [ articlesUsers, tags ] }))
    .then(r => res.json(sendSuccess(r, '创建成功')))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
