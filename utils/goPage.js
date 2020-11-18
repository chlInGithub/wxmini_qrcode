const util = require("./util.js")

var goPage = {
  goIndex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  goCapacity: function () {
    wx.redirectTo({
      url: '/pages/capacity/capacity'
    })
  },
  goGenCode: function () {
    wx.navigateTo({
      url: '/pages/gen_code/gen_code'
    })
  },
  goSeeCode: function () {
    wx.navigateTo({
      url: '/pages/see_code/see_code'
    })
  },
  goSmartCode: function () {
    wx.navigateTo({
      url: '/pages/smart_code/smart_code'
    })
  },
  /**
   * param ( ?key=xx&key=xx...)
   */
  goSmartCodeEdit: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      param = ""
    }
    wx.navigateTo({
      url: '/pages/smart_code_edit/smart_code_edit' + param
    })
  },
  /**
   * param ( ?key=xx&key=xx...)
   */
  goSmartCodeEleEdit: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      param = ""
    }
    wx.navigateTo({
      url: '/pages/smart_code_ele_edit/smart_code_ele_edit' + param
    })
  },

  goWXLogin: function () {
    wx.navigateTo({
      url: '/pages/wxLogin/wxLogin'
    })
  },
  checkLogin: function () {
    /*if (getApp().globalData.simple.user.hasPhone == true) {
      return true
    } else {
      goPage.goWXLogin()
      return false
    }*/
    return true
  },
  goUserInfo: function () {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo'
    })
  },
  goExtendPower: function(){
    wx.navigateTo({
      url: '/pages/extend_power/extend_power'
    })
  }
}

module.exports = {
  goPage: goPage
}