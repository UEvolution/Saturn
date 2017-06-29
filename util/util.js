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

const checkParmas = (body, need) => {
	let parmas = []
	if (need && need.length) {
		need.forEach(item => {if (!body[item]) parmas.push(item)})
	}
	return parmas
}

module.exports = {
	thenPool,
	sendSuccess,
	sendCheck,
	sendError,
	sendNotFind,
	checkParmas
}
