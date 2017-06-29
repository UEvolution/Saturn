const express = require('express')
const router = express.Router()
const {
	checkParmas,
	sendCheck
} = require('../../util/util')
const {
	getArticleList,
	getArticleView
} = require('../../selects')

router.post('/list', (req, res) => {
	getArticleList(r => res.json(r))
})

router.post('/view', (req, res) => {
	let parmas = checkParmas(req.body, ['id'])
	if (parmas.length) return res.json(sendCheck(parmas))
	getArticleView(r => res.json(r))
})

module.exports = router
