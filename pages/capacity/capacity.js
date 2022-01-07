// pages/capacity/capacity.js
const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showBYCode: function(){
    goPageUtil.goPage.goBYInfo()
  },
  go_gen_code: function() {
    goPageUtil.goPage.goGenCode()
  },

  go_see_code: function(){
    goPageUtil.goPage.goSeeCode()
  },

  go_smart_code: function(){
    goPageUtil.goPage.goSmartCode()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)
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