const express = require('express')
const router = express.Router()
const { sendSuccess, sendError } = require('../../util/util')
const articles = require('../../models/articles')
const users = require('../../models/users')
const tags = require('../../models/tags')
const article_tag = require('../../models/article_tag')

const articlesUsers = articles.belongsTo(users, {foreignKey: 'author_id', as: 'author'})

articles.belongsToMany(tags, { through: article_tag, foreignKey: 'article_id' })
tags.belongsToMany(articles, { through: article_tag, foreignKey: 'tag_id' })

router.post('/list', (req, res) => {
  let { offset = 0, limit = 10 }  = req.body.page || {}
  articles.findAndCountAll({ offset, limit, include: [articlesUsers] })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/view', (req, res) => {
  articles.findOne({
    where: req.body,
    include: [articlesUsers, tags]
  })
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/edit', (req, res) => {
  let { id }  = req.body
  articles.update(req.body, {where: {id}, include: [articlesUsers]})
    .then(r => res.json(sendSuccess(r)))
    .catch(error => res.json(sendError(undefined, error)))
})

router.post('/create', (req, res) => {
  articles.create(req.body)
    .then(r => res.json(sendSuccess(r, '创建成功')))
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
