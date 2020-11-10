const util = require("./util.js")
const goPageUtil = require("./goPage.js")
const requestUtil = require("./request.js")

var getCurrentS = function(){
  return util.getCurrentS()
}

var newToken = function(successCallBack, failCallBack) {
  // check has token
  if (util.objectUtil.verifyValidObject(getApp().globalData.expire) &&
    util.objectUtil.verifyValidObject(getApp().globalData.token) &&
    util.objectUtil.verifyValidObject(getApp().globalData.sessionId) &&
    getApp().globalData.expire > getCurrentS()) {
    successCallBack()
  }



  var sucCall = function(d) {
    console.log(d)
    console.log("sucCall")

    // 检查token数据
    if (!util.objectUtil.verifyValidObject(d.expire) || !util.objectUtil.verifyValidObject(d.token) ||
      !util.objectUtil.verifyValidObject(d.sessionId) || getCurrentS() > d.expire) {
      util.showMsg("token错误")
      return false
    }
    // 存储token等
    getApp().globalData.expire = d.expire
    getApp().globalData.token = d.token
    getApp().globalData.sessionId = d.sessionId

    successCallBack()
  }
  var failCall = function(res) {
    console.log(res)
    console.log("failCall")
    failCallBack(res)
  }
  wx.login({
    success: res => {
      //console.log(res)
      var code = res.code
      getApp().globalData.loginCode = code
      //console.log("globalData : " + getApp().globalData)

      var data = {
        shopId: getApp().globalData.shopId,
        tId: getApp().globalData.tId,
        appId: getApp().globalData.appId,
        requestDomain: getApp().globalData.requestDomain,
        code: code
      }

      requestUtil.request({
        url: "/wmall/token/newToken",
        data: data,
        method: 'POST',
        successCallBack: sucCall,
        failCallBack: failCall
      })
    }
  })
}

module.exports = {
  newToken: newToken
}