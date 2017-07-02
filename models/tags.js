const Sequelize = require('sequelize')
const sequelize = require('./index')

let Tags = sequelize.define('tags', {
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
    type: Sequelize.INTEGER
  },
  relate: {
    type: Sequelize.INTEGER
  },
  pic: {
    type: Sequelize.STRING
  },
  view: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

module.exports = Tags
