const Sequelize = require('sequelize')
const sequelize = require('./index')

let Roles = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  alias: {
    type: Sequelize.STRING,
    unique: true
  },
  bio: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 21
  }
}, {
  freezeTableName: true
})

module.exports = Roles
