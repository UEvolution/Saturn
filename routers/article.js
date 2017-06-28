const express = require('express')
const router = express.Router()

router.post('/list', (req, res) => {
	res.json({
		msg: 'send article',
		code: 200
	})
})

module.exports = router
