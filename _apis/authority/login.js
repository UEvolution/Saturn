const users = require('../../models/users')
const { hashPassword, getToken } =  require('../../utils')

module.exports = (req, res) => {
  let { nice_name, password } = req.body
  users.findOne({where: {nice_name}})
  .then(r => {
    if (hashPassword(password) === r.password) {
      r.login_times++
      r.save()
      let token = getToken(r)
      res.sendSuccess({data: token, msg: '登录成功'})
    } else {
      res.sendError({msg: '用户名，密码错误'})
    }
  })
  .catch(error => res.sendError({data: error}))
}
