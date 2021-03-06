const Sequelize = require('sequelize')
const sequelize = require('./index')

const Tags = sequelize.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: '标签名称不能为空!'
      }
    }
  },
  alias: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: {
        msg: '别名不能为空!'
      }
    }
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
  },
  relate: {
    type: Sequelize.INTEGER
  },
  pic: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: '请检查特色图片地址!'
      }
    }
  },
  view: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

module.exports = Tags
