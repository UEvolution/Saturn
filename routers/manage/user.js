const express = require('express')
const users = require('../../models/users')
const router = express.Router()

router.post('/list', (req, res) => {
  users.findAll()
    .then(r => console.log(r))
  // getArticleList(req.body, r => res.json(r))
})

router.post('/view', (req, res) => {
  // let parmas = checkParmas(req.body, ['id'])
  // if (parmas.length) return res.json(sendCheck(parmas))
  // getArticleView(req.body, r => res.json(r))
})

router.post('/create', (req, res) => {
  // let parmas = checkParmas(req.body, ['id', 'title', 'alias'])
  // if (parmas.length) return res.json(sendCheck(parmas))
  // createArticle(req.body, r => res.json(r))
})

module.exports = router
