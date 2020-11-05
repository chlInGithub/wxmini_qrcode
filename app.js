//app.js
const util = require('utils/util.js')
const goPageUtil = require('utils/goPage.js')


App({
  onLaunch: function () {
    this.globalData.imgPrefix = "https://wmall.5jym.com/img/"
    this.globalData.bgColor = '#EEEEEE'
    this.globalData.requestUrlPrefix = "https://wmall.5jym.com"

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  setLoginCode: function (loginCode) {
    this.globalData.loginCode = loginCode
    console.log("globalData : " + this.globalData)
  },
  globalData: {
    userInfo: null
  },

  /**
   * k: key
   * o: 数据
   * s: 超时相对秒数， 默认3600秒
   */
  addCache: function(k, o, s){
    if (util.objectUtil.isUndefined(this.globalData.cache)) {
      this.globalData['cache'] = {}
    }

    if (!util.objectUtil.verifyValidObject(k) || !util.objectUtil.verifyValidObject(o)){
      return
    }

    if (!util.objectUtil.verifyValidObject(s)) {
      s = 3600
    }

    var val = {
      data: o,
      expire: util.getCurrentS() + s
    }

    this.globalData['cache'][k] = val
  },
  delCache: function(k){
    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])) {
      return
    }
    this.globalData.cache[k] = undefined
  },
  getCache: function(k){
    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])){
      return undefined
    }
    // 取key对应val
    var val = this.globalData.cache[k]
    // 比对超时
    if (util.getCurrentS() > val.expire){
      return undefined
    }
    // 结果
    return val.data
  }
})