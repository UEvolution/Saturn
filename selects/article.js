const util = require('./../util/util')
const { queryData, createData, checkParmas, parst } = util

const getArticleList = callback => {
	queryData('SELECT * FROM article', callback)
}

const getArticleView = (data, callback) => {
	queryData(`SELECT * FROM article WHERE id='${data.id}'`, callback)
}

const createArticle = (data, callback) => {
	let parstParmas = parst({
		title: '"testtitle"',
		alias: '"aname"',
		excerpt: '"摘要"',
		author: 1,
		relate: 1
	}),
		sql = `INSERT INTO article (${parstParmas.key.join(',')}) VALUES (${parstParmas.value.join(',')})`
		console.log(sql)
	queryData(sql, callback)
}

module.exports = {
	getArticleList,
	getArticleView,
	createArticle
}
