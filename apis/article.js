const express = require('express')
const sequelize = require('../models')
const router = express.Router()
const auth = require('./auth')

const Articles = require('../models/articles')
const Users = require('../models/users')
const Tags = require('../models/tags')

const ArticlesUsers = Articles.belongsTo(Users, {foreignKey: 'author_id', as: 'author'})
const ArticlesTags = require('../models/article_tag')

Articles.belongsToMany(Tags, { through: ArticlesTags, foreignKey: 'article_id' })
Tags.belongsToMany(Articles, { through: ArticlesTags, foreignKey: 'tag_id' })

router.use('/list', (req, res) => {
  Articles.findAndCountAll({where: req.body, include: [ArticlesUsers, Tags]})
    .then(r => res.send(r))
})

router.use('/view', (req, res) => {
  Articles.findOne({where: req.body, include: [ArticlesUsers, Tags]})
    .then(r => {
      r.view ++
      r.save()
      return r.dataValues
    })
    .then(r => res.json(r))
})

router.use('/create', auth, (req, res) => {
  const { tags = [] } = req.body
  return sequelize.transaction(t => {
    return Articles
      .create({...req.body, author_id: req.user.id}, {transaction: t, lock: t.LOCK})
      .then(r => r.dataValues)
      .then(r => ArticlesTags.bulkCreate(
        Array.from(tags).map(tag => ({article_id: r.id, tag_id: tag})),
        {transaction: t, lock: t.LOCK})
      )
      .catch(err => {
        if(err.errors) {
          const es = []
          Array.from(err.errors).map(e => es.push(e.message))
          return Promise.reject(es.join(' '))
        } else {
          return Promise.reject(err)
        }
      })
  })
    .then(() => res.send({msg: '创建成功!'}))
    .catch(err => res.send({msg: err}))
})

router.use('/remove', auth, (req, res) => {
  return sequelize.transaction(t => {
    return Articles.destroy({where: {id: req.body.id}, transaction: t, lock: t.LOCK})
      .then(() => ArticlesTags.destroy({where: {article_id: req.body.id}, transaction: t, lock: t.LOCK}))
      .then(() => res.json({msg: '删除成功'}))
      .catch(() => res.json({msg: '删除失败'}))
  })
})

router.use('/edit', auth, (req, res) => {
  const { tags, id } = req.body
  if(!id) {
    return res.json({msg: '缺少内容id'})
  }
  return sequelize.transaction(t => {
    return Articles.update(req.body, {where: {id: req.body.id}, transaction: t, lock: t.LOCK})
      .then(() => {
        if(tags && tags.length) {
          return ArticlesTags.destroy({where: {article_id: id}, transaction: t, lock: t.LOCK})
        }
      })
      .then(() => {
        if(tags && tags.length) {
          return ArticlesTags.bulkCreate(
            Array.from(tags).map(tag => ({article_id: id, tag_id: tag})),
            {transaction: t, lock: t.LOCK}
          )
        }
      })
      .then(() => res.json({msg: '更新成功'}))
      .catch(() => res.json({msg: '更新失败'}))
  })
})

module.exports = router
