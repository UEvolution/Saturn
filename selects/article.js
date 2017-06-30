const util = require('./../util/util')
const { GET_ARTICLE } = require('./../util/fields')
const { queryData, createData, checkParmas, parmasToQuery } = util

const getArticleList = (data, callback) => {
	queryData(parmasToQuery(GET_ARTICLE, data), callback)
}

const getArticleView = (data, callback) => {
	queryData(parmasToQuery(GET_ARTICLE, data), callback)
}

const createArticle = (data, callback) => {
	// let parmas = parstParmas(GET_ARTICLE, testParmas),
	// 	sql = `INSERT INTO article (${parmas.k.join(',')}) VALUES (${parmas.v.join(',')})`
	// 	console.log(sql)
	// queryData(sql, callback)
}

module.exports = {
	getArticleList,
	getArticleView,
	createArticle
}
