const mysql = require('mysql')
const config = require('./../config')
const pool  = mysql.createPool(config.mysql)

const thenPool = select => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) return reject(err)
			connection.query(select, (error, results, fields) => {
				if (error) return reject(error)
				resolve(results)
				connection.release()
			})
		})
	})
}

const queryData = (select, callback) => {
	if (!callback || typeof callback !== 'function') throw 'callback is required'
	thenPool(select)
		.then(r => callback(sendSuccess(r)))
		.catch(r => callback(sendError(r)))
}

const sendError = error => ({
	code: 100,
	msg: '数据获取失败',
	error: error
})

const sendSuccess = data => ({
	code: 200,
	list: data,
	msg: '数据获取成功'
})

const sendCheck = check => ({
	code: 300,
	msg: '参数有误',
	check
})

const sendNotFind = () => ({
	code: 400,
	msg: '此接口未定义'
})

const sendServerError = () => ({
	code: 500,
	msg: '服务器错误'
})

const checkParmas = (body, need) => {
	let parmas = []
	if (need && need.length) {
		need.forEach(item => {if (!body[item]) parmas.push(item)})
	}
	return parmas
}

const parst = body => {
	let key = [], value = []
	for (let k in body) {
		if (body.hasOwnProperty(k)) {
			key.push(k)
			value.push(body[k])
		}
	}
	return { key, value }
}

module.exports = {
	thenPool,
	queryData,
	sendSuccess,
	sendCheck,
	sendError,
	sendNotFind,
	sendServerError,
	checkParmas,
	parst
}
