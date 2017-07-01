const express = require('express')
const router = express.Router()

router.post('/list', (req, res) => {
  // getArticleList(r => res.json(r))
})

router.post('/view', (req, res) => {
  // let parmas = checkParmas(req.body, ['id'])
  // if (parmas.length) return res.json(sendCheck(parmas))
  // getArticleView(r => res.json(r))
})

module.exports = router
