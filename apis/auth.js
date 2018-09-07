const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
  const Authorization = req.get('Authorization')
  jwt.verify(Authorization, config.jwtString, (err, data) => {
    if(err) {
      return res.json({msg: 'UnAuthorized'})
    }
    res.set('Authorization', jwt.sign({...data, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, config.jwtString))
    req.user = data
    return next()
  })
}
