const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')
const tag = require('./tag')
const jwt = require('jsonwebtoken')
const config = require('../../config')

router.use((req, res, next) => {
  if (req.headers.token) {
    jwt.verify(req.headers.token, config.jwtString, (error, data) => {
      if (!error) {
        req.user_data = data
        next()
      } else {
        next()
      }
    })
  } else {
    next()
  }
})
router.use('/article', article)
router.use('/user', user)
router.use('/tag', tag)

module.exports = router
