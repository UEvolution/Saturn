const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config')
const Users = require('../models/users')
const { hashPassword } = require('../utils')
const auth = require('./auth')

router.use('/login', async (req, res) => {
  const user = await Users.findOne({where: {niceName: req.body.niceName}})
  .then(r => {
    r.loginTimes ++
    r.save()
    return r.dataValues
  })
  .catch(() => null)
  if(user) {
    if(user.password === hashPassword(req.body.password)) {
      delete user.password
      return res.send({token: jwt.sign({...user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, config.jwtString), msg: '登录成功'})
    }
    return res.send({msg: '密码错误'})
  }
  res.send({msg: '暂无数据'})
})

router.use('/info', auth, (req, res) => {
  if(req.user) {
    return res.json(req.user)
  }
  return res.json({msg: '请先登录'})
})

router.use('/create', async (req, res) => {
  const { password, ...other } = req.body
  const user = await Users.create({...other, password: hashPassword(password) }, {validate: true})
    .then(r => r.dataValues).catch(() => null)
  if(user) {
    return res.json(user)
  }
  res.json({msg: '创建失败'})
})

router.use('/edit', auth, async (req, res) => {
  const user = await Users.findOne({where: {id: req.user.id}}).catch(() => null)
  if(user) {
    return user.update(req.body)
      .then(r => res.json({msg: '修改成功', data: r.dataValues}))
      .catch(() => res.json({msg: '修改失败'}))
  }
  res.json({msg: '修改失败'})
})

module.exports = router
