const Sequelize = require('sequelize')
const sequelize = require('./index')

let Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  niceName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      minLen(val) {
        if(!val) {
          return new Error('密码不能为空!')
        } else if (val.length < 6) {
          return new Error('密码长度不能低于6位!')
        } else if(val.length > 26) {
          return new Error('密码长度不能大于26位!')
        } else {
          return val
        }
      }
    }
  },
  pic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: '请检查特色图片地址!'
      }
    }
  },
  avatar: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: '请检查头像地址!'
      }
    }
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 21
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  bio: {
    type: Sequelize.TEXT,
    defaultValue: '来啊！把我改了吧!'
  },
  role: {
    type: Sequelize.INTEGER
  },
  loginTimes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Users
