// pages/extend_power/extend_power.js
const util = require("wxmini_common_js").util
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thirdNick: "",
    mobile: ""
  },

  saveUser: function(){
    var data = {
      thirdNick: this.data.thirdNick,
      mobile: this.data.mobile
    }
    var that = this
    requestDataUtil.postData.userInfo(
      data,
      function(){
        that.data.simple.user.hasPhone = true
        that.data.simple.user.thirdNick = data.thirdNick
        getApp().globalData.simple = that.data.simple
        that.setData({
          simple: that.data.simple
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)
    var that = this
    requestDataUtil.getData.getAdminImg(
      function(data){
        that.setData(
          {
            admin_img: data
          }
        )
      }
    )
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