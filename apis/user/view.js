const users = require('../../models/users')
const { sendSuccess, sendError, limitBody } =  require('../../utils')

module.exports = async (req, res) => {
  const where = await limitBody(req.body, ['id', 'nice_name'])
  users.findOne({where, attributes: {exclude: ['password']}})
  .then(r => {
    const resJson = r.dataValues
    res.send(resJson)
  })
  .catch(error => res.send(error))
}
