const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const users = require('../models/users')
const { getToken } = require('../util/util')

router.use('/login', (req, res) => {
  let { nice_name, password } = req.body
  users.findOne({nice_name})
    .then(r => {
      if (password === r.password) {
        let token = getToken(r)
        res.json({
          user: r,
          token
        })
      } else {
        res.json({
          msg: '用户名，密码错误',
          code: 100
        })
      }
    })
})

router.use('/register', (req, res) => {
  let { nice_name, password, email, avatar, bio } = req.body
  if (!nice_name) {
    return res.json({
      msg: '请输入用户昵称',
      code: 100
    })
  }
  if (!password) {
    return res.json({
      msg: '请输入密码',
      code: 100
    })
  }
  users.create(req.body)
    .then(r => {
      res.json({
        msg: '注册成功',
        code: 200,
        token: getToken(r)
      })
    })
})

module.exports = router
