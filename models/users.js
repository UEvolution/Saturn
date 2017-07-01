const Sequelize = require('sequelize')
const sequelize = require('./index')

let Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  nice_name: {
    type: Sequelize.STRING,
    unique: true
  },
  avatar: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.INTEGER
  }
})

module.exports = Users
