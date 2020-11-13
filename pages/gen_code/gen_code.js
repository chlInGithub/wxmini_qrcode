// pages/gen_code/gen_code.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin_text: "",
    showCode: true,
    codeBaseUrl: "https://wmall.5jym.com/wmall/qrcode/gen",
    schemas: ["纯文本", "网址"],
    index: 1
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindFormSubmit: function(e){
    var text = e.detail.value.origin_text
    if (text == undefined || text == "") {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }

    if(this.data.index > 0){
      /* var schema = this.data.schemas[this.data.index]
      text = schema + text*/
      var oRegUrl = new RegExp(); 
      oRegUrl.compile("^(https|http)://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
      if (!oRegUrl.test(text)) {
        wx.showToast({
          title: '网址格式错误',
        })
        return false;
      }
    }

    

    var encoded = text
    var signParams = requestUtil.dealParams(this.data.codeBaseUrl, {
      text: encoded
    })
    var codeUrl = this.data.codeBaseUrl + "?" + signParams
    this.setData({
      codeUrl: codeUrl,
      text: text
    })
/*     wx.previewImage({
      urls: [codeUrl],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: res,
        })
      }
    }) */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})