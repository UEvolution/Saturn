module.exports = {
  mysql: {
    database: '',
    host: 'localhost',
    port: 3306,
    user: '',
    password: ''
  },
  port: 4000,
  jwtString: '',
  default: {
    user: {
      nice_name: '',
      password: '',
      role: 1,
      status: 21
    },
    articleTag: {
      article_id: 1,
      tag_id: 1
    },
    tag: {
      title: 'tag',
      alias: 'tag',
      bio: 'initialize tag',
      author: 1,
      status: 21
    },
    role: {
      title: 'admin',
      alias: 'admin',
      bio: 'administrator',
      author: 1,
      status: 21
    }
  }
}
