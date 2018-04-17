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
      if(body[k] !== undefined) {
        data[k] = body[k]
      }
    } else if(typeof k === 'object' && !Array.isArray(k)) {
      if(k.require && !body[k]) {
        errors.push(k + ' is require')
      } else {
        if(body[k] !== undefined) {
          data[k] = body[k]
        }
      }
    }
  })
  errors.length ? reject(errors) : resolve(data)
})

const hashPassword = password => {
  const hash = crypto.createHash('sha256')
  hash.update(config.cryptoText + password)
  return hash.digest('hex')
}

module.exports = Object.assign({ mode, limitBody, hashPassword }, status)
