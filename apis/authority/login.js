const users = require('../../models/users')
const { sendSuccess, sendError } =  require('../../utils')

module.exports = (req, res) => {
  let { nice_name, password } = req.body
  users.findOne({nice_name})
  .then(r => {
    if (password === r.password) {
      let token = getToken(r)
      res.json(sendSuccess(token, '登录成功'))
    } else {
      res.json(sendError('用户名，密码错误'))
    }
  })
  .catch(error => res.json(sendError(undefined, error)))
}
