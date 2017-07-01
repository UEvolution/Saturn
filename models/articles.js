const Sequelize = require('sequelize')
const sequelize = require('./index')

let Articles = sequelize.define('articles', {
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
  tags: {
    type: Sequelize.STRING
  },
  excerpt: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
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

module.exports = Articles
