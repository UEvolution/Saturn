const Sequelize = require('sequelize')
const sequelize = require('./index')

let user_role = sequelize.define('user_role', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.STRING,
    unique: true
  },
  role_id: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
})

module.exports = user_role
