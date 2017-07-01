const Sequelize = require('sequelize')
const config = require('./../config')

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

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

module.exports = {
  sendSuccess,
  sendCheck,
  sendError,
  sendNotFind,
  sendServerError
}
