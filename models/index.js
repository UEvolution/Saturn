const Sequelize = require('sequelize')
const config = require('./../config')
const mode = process.env.NODE_ENV || 'development'
const { mysql } = config[mode]

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = sequelize
