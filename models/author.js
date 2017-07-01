const Sequelize = require('sequelize')
const sequelize = require('./index')
// 官方示例，测试使用
let Author = sequelize.define('author', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  nice_name: {
    type: Sequelize.STRING
  },
  alias: {
    type: Sequelize.STRING,
    unique: true
  },
  bio: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  },
  avatar: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

module.exports = Author
