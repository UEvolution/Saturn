const express = require('express')
const router = express.Router()
const users = require('../models/users')
const {
  limitBody,
  hashPassword,
  checkLogin,
} =  require('../utils')

router.use('/create', async (req, res) => {
  return await limitBody(req.body, [{key: 'nice_name', required: true}, {key: 'password', required: true}])
    .then(body => {
      body.password = hashPassword(body.password)
      return users.create({...body})
    })
    .then(r => res.sendSuccess({msg: '创建成功'}))
    .catch(error => res.sendError(error))
})

router.use('/view', async (req, res) => {
  return await limitBody(req.body, [['id', 'nice_name']])
    .then(where => users.findOne({where, attributes: {exclude: ['password']}}))
    .then(r => r.dataValues)
    .then(r => resJson ? res.sendSuccess({data: resJson}) : Promise.reject({msg: '暂无数据!'}))
    .catch(error => res.sendError(error))
})

router.use(checkLogin)

router.use('/destroy', async (req, res) => {
  return await users.destroy({id: req.user.id})
    .then(() => res.sendSuccess({msg: '删除成功'}))
    .catch(error => res.sendError(error))
})

router.use('/edit', async (req, res) => {
  return await limitBody(req.body, ['avatar', 'email', 'bio'])
    .then(edit => users.update(edit, {where: {id: req.user.id}}))
    .then(() => res.sendSuccess({msg: '修改成功'}))
    .catch(error => res.sendError(error))
})

module.exports = router
