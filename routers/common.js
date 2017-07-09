const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const users = require('../models/users')
const { getToken, sendError, sendSuccess } = require('../util/util')

router.use('/login', (req, res) => {
  let { nice_name, password } = req.body
  users.findOne({nice_name})
    .then(r => {
      if (password === r.password) {
        let token = getToken(r)
        res.json(sendSuccess(token, '登录成功'))
      } else {
        res.json(sendError('用户名，密码错误'))
      }
    })
    .catch(error => res.json(sendError(undefined, error)))
})

router.use('/register', (req, res) => {
  let { nice_name, password, email, avatar, bio } = req.body
  if (!nice_name) {
    return res.json(sendError('请输入用户昵称'))
  }
  if (!password) {
    return res.json(sendError('请输入密码'))
  }
  users.create(req.body)
    .then(r => {
      res.json(sendSuccess(getToken(r), '注册成功'))
    })
    .catch(error => res.json(sendError(undefined, error)))
})

module.exports = router
