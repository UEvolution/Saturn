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
  excerpt: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  author_id: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 21
  },
  relate: {
    type: Sequelize.INTEGER
  },
  pic: {
    type: Sequelize.STRING
  },
  view: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true
})

module.exports = Articles
