const users = require('../../models/users')
const { limitBody } =  require('../../utils')

module.exports = async (req, res) => {
  const where = await limitBody(req.body, ['id', 'nice_name'])
  if(!(where.id || where.nice_name)) {
    return res.send({msg: '请输入要删除的用户id或nice_name'})
  }
  users.destroy({where})
  .then(r => {
    res.send({msg: '删除成功'})
  })
  .catch(error => res.send({errors: error.errors}))
}
