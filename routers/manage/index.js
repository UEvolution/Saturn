const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const article = require('./article')
const config = require('../../config')
const user = require('./user')

router.use((req, res, next) => {
  if (!req.headers.token) {
    res.json({
      msg: '请先登录',
      code: 100
    })
  } else {
    jwt.verify(req.headers.token, config.jwtString, (error, data) => {
      if (error) {
        res.json({
          msg: 'token错误',
          code: 100,
          error
        })
      } else {
        req.user_data = data
        next()
      }
    })
  }
})
router.use('/article', article)
router.use('/user', user)

module.exports = router
