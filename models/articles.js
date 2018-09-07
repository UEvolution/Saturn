const Sequelize = require('sequelize')
const sequelize = require('./index')

const Users = require('../models/users')
const Tags = require('../models/tags')
const ArticleTag = require('../models/article_tag')

const Articles = sequelize.define('articles', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '标题不能为空!'
      }
    }
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: '别名不能为空!'
      }
    }
  },
  excerpt: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '内容不能为空!'
      }
    }
  },
  author_id: {
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
    allowNull: false,
    validate: {
      isUrl: {
        msg: '请检查特色图片地址!'
      }
    }
  },
  view: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true,
  hooks: {
    validationFailed(articles, options, error) {
      console.log(articles)
      if(error) {
        return new Error(error)
      }
    }
  }
})

// const ArticlesUsers = Articles.belongsTo(Users, {foreignKey: 'author_id', as: 'author'})

// Articles.belongsToMany(Tags, { through: ArticleTag, foreignKey: 'article_id' })
// Tags.belongsToMany(Articles, { through: ArticleTag, foreignKey: 'tag_id' })

module.exports = Articles
