const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('./../config')
const status = require('./status')

const mode = process.env.NODE_ENV || 'development'

const limitBody = (body = {}, limits = []) => new Promise((resolve, reject) => {
  const data = {}
  const values = []
  const errors = []

  limits.map(k => {
    if(typeof k === 'string') {
      if(typeof body[k] !== 'undefined') {
        data[k] = body[k]
      }
    } else if(typeof k === 'object') {
      if(Array.isArray(k)) {
        let d
        k.map(s => {
          if(body[s]) {
            data[s] = body[s]
            d = body[s]
          }
        })
        if(!d) {
          errors.push('Please fill in one of ' + k.join(' '))
        }
      } else {
        if(k.required && !body[k.key]) {
          errors.push(k.key + ' is required')
        } else {
          if(body[k.key] !== undefined) {
            data[k.key] = body[k.key]
          }
        }
      }
    }
  })
  errors.length ? reject({msg: errors.join(' ')}) : resolve(data)
})

const hashPassword = password => {
  const hash = crypto.createHash('sha256')
  hash.update(config.cryptoText + password)
  return hash.digest('hex')
}

const getToken = data => jwt.sign({data}, config.jwtString, { expiresIn: '1h', algorithm: 'HS512' })

const bulkList = (id, list = []) => {
  let _list = []
  list.map(item => _list.push({article_id: id, tag_id: item}))
  return _list
}

const formatError = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers['x-access-token'], config.jwtString).data
  } catch (error) {}
  res.sendSuccess = ({data, msg = '操作成功!', code = 200}) => res.json({code, msg, data})
  res.sendError = ({msg = '操作失败!', code = 0, errors}) => {
    if(errors) {
      const es = []
      errors.map(e => es.push(e.message))
      msg = es.join(', ')
    }
    res.json({code, msg})
  }
  next()
}

const checkLogin = (req, res, next) => {
  if(!req.user) {
    return res.sendError({msg: '请先登录！'})
  }
  next()
}

module.exports = Object.assign({ mode, limitBody, hashPassword, getToken, formatError, checkLogin }, status)
