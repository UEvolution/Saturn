const express = require('express')
const router = express.Router()
const {
	checkParmas,
	sendCheck
} = require('../../util/util')
const {
	getArticleList,
	getArticleView,
	createArticle
} = require('../../selects')

router.post('/list', (req, res) => {
	getArticleList(req.body, r => res.json(r))
})

router.post('/view', (req, res) => {
	let parmas = checkParmas(req.body, ['id'])
	if (parmas.length) return res.json(sendCheck(parmas))
	getArticleView(req.body, r => res.json(r))
})

router.post('/create', (req, res) => {
	let parmas = checkParmas(req.body, ['id', 'title', 'alias'])
	if (parmas.length) return res.json(sendCheck(parmas))
	createArticle(req.body, r => res.json(r))
})

module.exports = router
