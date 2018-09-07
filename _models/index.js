const Sequelize = require('sequelize')
const config = require('./../config')
const mode = process.env.NODE_ENV || 'development'
const { mysql } = config[mode]

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
})

module.exports = sequelize
