// 本脚本会初始化数据库，请谨慎使用

const sequelize = require('./models')
const articles = require('./models/articles')

articles.sync({force: true})

const users = require('./models/users')

// 默认用户数据，默认管理员
Users.sync({force: true}).then(() => (
  Users.create({
    status: 21,
    nice_name: 'wolyshaw',
    role: 1
  })
))
