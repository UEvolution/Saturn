const Sequelize = require('sequelize')
const sequelize = require('./index')

let article_tag = sequelize.define('article_tag', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  article_id: {
    type: Sequelize.INTEGER
  },
  tag_id: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
})

module.exports = article_tag
