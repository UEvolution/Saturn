const util = require('./../util/util')
const {
	thenPool,
	sendError,
	sendSuccess
} = util

const getArticleList = callback => {
	if (!callback || typeof callback !== 'function') throw 'callback is required'
	thenPool('SELECT id, title FROM article')
		.then(r => callback(sendSuccess(r)))
		.catch(r => callback(sendError(r)))
}

const getArticleView = callback => {
	if (!callback || typeof callback !== 'function') throw 'callback is required'
	thenPool('SELECT id, title FROM article')
		.then(r => callback(sendSuccess(r)))
		.catch(r => callback(sendError(r)))
}

module.exports = {
	getArticleList,
	getArticleView
}
