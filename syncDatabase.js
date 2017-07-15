// 本脚本会初始化数据库，请谨慎使用

const sequelize = require('./models')
const articles = require('./models/articles')
const users = require('./models/users')
const roles = require('./models/roles')
const tags = require('./models/tags')
const article_tag = require('./models/article_tag')

const config = require('./config')
const { user, role, tag, articleTag } = config.default

roles.sync({force: true})
  .then(() => (
    roles.create(role)
  ))

tags.sync({force: true})
  .then(() => (
    tags.create(tag)
  ))
articles.sync({force: true})

article_tag.sync({force: true})
  .then(() => (
    article_tag.create(articleTag)
  ))

users.sync({force: true})
  .then(() => (
    users.create(user)
  ))
