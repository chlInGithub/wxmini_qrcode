//index.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    shopName: "变.码",
    progressText: "正在努力打开页面……"
  },
  onLoad: function () {
    util.initPage(this)
  },
  onShow: function(){
    // 登录系统 存储token
    this.deal()
  },
  deal: function(){
    var that = this

    tokenUtil.newToken(
      function (res) {
        requestDataUtil.getData.getShopSimpleInfo(
          function(){
            goPageUtil.goPage.goCapacity()
          }
        )
      }, function () {
        util.showMsg("获取token失败", function () {
          goPageUtil.goPage.goIndex()
        })
      }
    )

  },
})
