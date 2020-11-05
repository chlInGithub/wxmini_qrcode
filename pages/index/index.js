//index.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    shopImg: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoW63kUFCfRksZLhgXTxicxU86sRibPnzibJFeaqj3m5Qeh8eLHZgCODT2oicvDwicYDZk0wrSQf4Sv9Tw/132",
    shopName: "变.码",
    progressText: "正在努力打开页面……"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.login({
      success: res => {
        console.log(res)
        var code = res.code
        app.setLoginCode(code)

        // TODO 
        // return
        goPageUtil.goPage.goCapacity()
      }
    })
  },
})
