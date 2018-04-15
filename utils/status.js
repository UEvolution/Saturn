module.exports = {
  sendError(msg = '数据获取失败', error) {
    return {
      code: 100,
      msg,
      error
    }
  },
  sendSuccess(msg = '数据获取失败', error) {
    return {
      code: 200,
      list: data,
      msg
    }
  },
  sendCheck(check) {
    return {
      code: 300,
      msg: '参数有误',
      check
    }
  },
  sendNotFind() {
    return {
      code: 400,
      msg: '此接口未定义'
    }
  },
  sendServerError() {
    return {
      code: 500,
      msg: '服务器错误'
    }
  }
}
