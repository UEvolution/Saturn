const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('./../config')
const status = require('./status')

const mode = process.env.NODE_ENV || 'development'

module.exports = Object.assign({mode}, status)
