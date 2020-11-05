// pages/smart_code/smart_code.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    smartCodes: []
  },

  delSmartCode: function(event){
    var id = util.eventUtil.getParaFromEvent(event, 'id')
    var ele = util.arrayUtil.getEleById(this.data.smartCodes, id)
    if(!util.objectUtil.verifyValidObject(ele)){
      util.showMsg("数据不存在")
      return false
    }
    var that = this
    requestDataUtil.postData.delSmartCode(
      id, 
      function(){
        util.arrayUtil.delEleById(that.data.smartCodes, id)
        that.setData({
          smartCodes: that.data.smartCodes
        })
      }
      )
  },
  goSmartCodeDetail: function(event){
    var id = util.eventUtil.getParaFromEvent(event, 'id', false)
    if(!util.objectUtil.verifyValidObject(id)){
      id = 0
    }
    goPageUtil.goPage.goSmartCodeEdit("?id=" + id)
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
    var that = this 
    requestDataUtil.getData.smartCodeList(
      function(data){
        if(!util.objectUtil.verifyValidObject(data)){
          return
        }
        that.setData({
          smartCodes: data
        })
      }
    )
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