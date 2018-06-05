const fs = require('fs')
const qiniu = require('qiniu')
const config = require('../../config')

Object.assign(qiniu.conf, config.qiniu.conf)

const bucket = 'play'
const returnBody = '{"key":"$(key)","hash":"$(etag)","imageInfo":$(imageInfo),"name":"$(x:name)"}'
const qiniuConfig = new qiniu.conf.Config()
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig)
const putExtra = new qiniu.form_up.PutExtra()
const token = new qiniu.rs.PutPolicy({scope: bucket, returnBody}).uploadToken()

module.exports = async (req, res) => {
  const files = Array.isArray(req.files.filekey) ? req.files.filekey : [req.files.filekey]
  const pushs = []
  if(!req.files.filekey || files.length < 1) return res.sendError({msg: '请至少选择一个需要上传的文件!'})
  files.map(file => {
    pushs.push(new Promise(resolve => {
      const name = file.originalFilename
      const stream = fs.createReadStream(file.path)
      fs.unlinkSync(file.path)
      formUploader.putStream(token, name, stream, putExtra, (respErr, respBody, respInfo) => resolve({respErr, respBody, respInfo}))
    }))
  })
  const reslist = await Promise.all(pushs)
  res.sendSuccess({data: reslist.length === 1 ? reslist[0] : reslist})
}
