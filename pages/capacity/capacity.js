// pages/capacity/capacity.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  go_gen_code: function() {
    /*wx.request({
      url: 'https://wmall.5jym.com/wmall/qrcode/saveSmartCode',
      data: {
        id: '73635262',
        title: 'title1',
        ownerImg: 'ownerImg',
        codeImg: 'codeImg',
        eles: [
          {
            id: 'ele1',
            title: 'eletitle1',
            img: 'eleimg1',
            sort: 10
          }
          ,{
            id: 'ele2',
            title: 'eletitle2',
            img: 'eleimg2',
            sort: 10
          },
        ]
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res.data)
      },
      fail: function(res){
        console.log(res.data)
      }
    })*/
    /**/
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