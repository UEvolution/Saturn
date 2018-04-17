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
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 64]
    }
  },
  // pic: {
  //   type: Sequelize.STRING
  // },
  avatar: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 21
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  bio: {
    type: Sequelize.TEXT
  },
  role: {
    type: Sequelize.INTEGER
  },
  login_times: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Users
