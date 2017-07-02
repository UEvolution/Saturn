const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const article = require('./article')
const user = require('./user')

router.use((req, res, next) => {
  if (!req.headers.token) {
    res.json({
      msg: '请检查token'
    })
  } else {
    jwt.verify(req.headers.token, 'fgfdhfghgj', (error, data) => {
      if (error) {
        res.json({
          msg: 'token错误',
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
