const express = require('express')
const router = express.Router()
const {
  limitBody,
  bulkList,
  checkLogin,
} =  require('../utils')
const articles = require('../models/articles')
const users = require('../models/users')
const tags = require('../models/tags')
const article_tag = require('../models/article_tag')
const articlesUsers = articles.belongsTo(users, {foreignKey: 'author_id', as: 'author'})

articles.belongsToMany(tags, { through: article_tag, foreignKey: 'article_id' })
tags.belongsToMany(articles, { through: article_tag, foreignKey: 'tag_id' })

router.use('/view', async (req, res) => {
  return limitBody(req.body, [['id', 'alias']])
    .then(where => {
      where.status = 21
      return articles.findOne({  where, include: [ articlesUsers, tags ] })
    })
    .then(r => r ? res.sendSuccess({data: r}) : res.sendError({msg: '暂无数据!'}))
    .catch(error => {
      return res.sendError(error)
    })
})

router.use(checkLogin)

router.use('/create', async (req, res) => {
  return limitBody(req.body, [{key: 'title', required: true}, {key: 'alias', required: true}, 'excerpt', 'content', 'relate', 'pic'])
    .then(body => {
      body.author_id = req.user.id
      return articles.create({...body})
    })
  .then(async r => {
    const tags = await article_tag.bulkCreate(bulkList(r.id, req.body.tags))
    return tags ? r : Promise.reject({msg: '新增tag出错'})
  })
  .then(r => res.sendSuccess({msg: '创建成功', data: r}))
  .catch(error => res.sendError(error))
})
// router.use('/destroy', destroy)
// router.use('/edit', edit)

exports.router = router
