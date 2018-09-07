const express = require('express')
const sequelize = require('../models')
const router = express.Router()
const { tagsLimit } = require('../limits/index')

const tags = require('../models/tags')
const users = require('../models/users')
const tagsUsers = tags.belongsTo(users, {foreignKey: 'author', as: 'user'})

const {
  limitBody,
  bulkList
} =  require('../utils')

router.use('/list', (req, res) => {
  tags.findAndCountAll({include: [ tagsUsers ]})
    .then(r => res.sendSuccess({data: r}))
    .catch(error => res.sendError({data: error}))
})

router.use('/view', async (req, res) => {
  return limitBody(req.body, [['id', 'alias']])
    .then(where => tags.findOne({where, include: [ tagsUsers ]}))
    .then(r => res.sendSuccess({data: r}))
    .catch(error => res.sendError(error))
})

router.use((req, res, next) => {
  if(!req.user) {
    return res.sendError({msg: '请先登录！'})
  }
  next()
})

router.use('/create', async (req, res) => {
  sequelize.transaction().then(t => {
    return limitBody(req.body, tagsLimit.create)
    .then(body => {
      body.author = req.user.id
      return tags.create({...body}, {transaction: t})
    })
    .then(r => {
      res.sendSuccess({data: r, msg: '创建成功!'})
      t.commit()
    })
    .catch(error => {
      res.sendError({data: error, msg: '创建失败!'})
      t.rollback()
    })
  })
})

module.exports = router
