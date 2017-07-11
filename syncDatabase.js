// 本脚本会初始化数据库，请谨慎使用

const sequelize = require('./models')
const articles = require('./models/articles')
const users = require('./models/users')
const roles = require('./models/roles')
const tags = require('./models/tags')
const user_role = require('./models/user_role')

const config = require('./config')
const { user, role, tag, userRole } = config.default

roles.sync({force: true})
  .then(() => (
    roles.create(role)
  ))

tags.sync({force: true})
  .then(() => (
    tags.create(tag)
  ))
articles.sync({force: true})

user_role.sync({force: true})
  .then(() => (
    user_role.create(userRole)
  ))

users.sync({force: true})
  .then(() => (
    users.create(user)
  ))
