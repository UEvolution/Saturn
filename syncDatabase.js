// 本脚本会初始化数据库，请谨慎使用

const sequelize = require('./models')
const articles = require('./models/articles')
const users = require('./models/users')
const roles = require('./models/roles')
const tags = require('./models/tags')
const user_role = require('./models/user_role')

roles.sync({force: true})
tags.sync({force: true})
user_role.sync({force: true})
articles.sync({force: true})

// 默认用户数据，默认管理员
users.sync({force: true}).then(() => (
  users.create({
    status: 21,
    nice_name: 'wolyshaw',
    role: 1
  })
))
