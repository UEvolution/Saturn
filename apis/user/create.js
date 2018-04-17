const users = require('../../models/users')
const { limitBody, hashPassword } =  require('../../utils')

module.exports = async (req, res) => {
  const body = await limitBody(req.body, ['nice_name', 'password'])
  if(!body.password) {
    return res.send({msg: '请输入密码'})
  }
  body.password = hashPassword(body.password)
  users.create({...body})
  .then(r => res.send({msg: '创建成功'}))
  .catch(error => res.send({errors: error.errors}))
}
