// 本脚本会初始化数据库，请谨慎使用

const sequelize = require('./models')
const articles = require('./models/articles')
const users = require('./models/users')
const roles = require('./models/roles')
const tags = require('./models/tags')
const user_role = require('./models/user_role')

roles.sync({force: true})
  .then(() => (
    roles.create({
      title: 'admin',
      alias: 'admin',
      bio: 'administrator',
      author: 1,
      status: 21
    })
  ))

tags.sync({force: true})
  .then(() => (
    tags.create({
      title: 'tag',
      alias: 'tag',
      bio: 'initialize tag',
      author: 1,
      status: 21
    })
  ))
articles.sync({force: true})

user_role.sync({force: true})
  .then(() => (
    user_role.create({
      user_id: 1,
      role_id: 1
    })
  ))

// 默认用户数据，默认管理员
users.sync({force: true})
  .then(() => (
    users.create({
      status: 21,
      nice_name: 'wolyshaw',
      role: 1
    })
  ))
