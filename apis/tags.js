const express = require('express')
const sequelize = require('../models')
const router = express.Router()
const auth = require('./auth')

const Tags = require('../models/tags')
const Users = require('../models/users')

const TagsUsers = Tags.belongsTo(Users, {foreignKey: 'author'})
const ArticlesTags = require('../models/article_tag')

router.use('/list', async (req, res) => {
  Tags.findAndCountAll({where: {...req.body}, include: [{model: TagsUsers}]})
    .then(r => res.json(r))
    .catch(err => {
      console.log(err)
      res.json({msg: '暂无数据'})
    })
})

router.use('/view', (req, res) => {
  Tags.findOne({where: {...req.body}, include: [TagsUsers]})
    .then(r => res.json(r))
    .catch(() => res.json({msg: '暂无数据'}))
})

router.use('/create', auth, (req, res) => {
  Tags.create({...req.body, author: req.user.id})
    .then(r => res.json({msg: '创建成功', data: r}))
    .catch(() => res.json({msg: '创建失败'}))
})

router.use('/remove', auth, (req, res) => {
  Tags.destroy({where: req.body})
    .then(r => res.json({msg: '删除成功', data: r}))
    .catch(() => res.json({msg: '删除成功'}))
})

router.use('/edit', auth, (req, res) => {
  const { id, ...other } = req.body
  if(!id) {
    return res.json({msg: '缺少标签id'})
  }
  Tags.update({...other, author: req.user.id}, {where: {id: id}})
    .then(() => res.json({msg: '修改成功'}))
    .catch(() => res.json({msg: '修改成功'}))
})

module.exports = router
