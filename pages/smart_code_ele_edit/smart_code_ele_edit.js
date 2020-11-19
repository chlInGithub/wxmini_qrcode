// pages/smart_code_ele_edit/smart_code_ele_edit.js
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

  tempModify: function(){
    var key = this.data.smartCodeId
    var eles = []
    eles.push({
      id: this.data.id,
      title: this.data.title,
      img: this.data.img,
      sort: this.data.sort,
      showMax: this.data.showMax,
      showCount: this.data.showCount,
      cache: true
    })
    getApp().addCache(key, eles, undefined, true)
  },
  bindblur4Title: function(){
    if(this.data.oldTitle != this.data.title){
      this.tempModify()
    }
  },
  bindblur4Img: function(){
    if(this.data.oldImg != this.data.img){
      this.tempModify()
    }
  },
  bindblur4Sort: function(){
    if(this.data.oldSort != this.data.sort){
      this.tempModify()
    }
  },
  bindblur4Max: function(){
    if(this.data.oldShowMax != this.data.showMax){
      this.tempModify()
    }
  },


  saveEle: function(){
    if(!util.objectUtil.verifyValidObject(this.data.id) 
      || !util.objectUtil.verifyValidObject(this.data.smartCodeId)
      || !util.objectUtil.verifyValidObject(this.data.title)
      || !util.objectUtil.verifyValidObject(this.data.img)
      || !util.objectUtil.verifyValidObject(this.data.sort)){
      util.showMsg("缺少数据")
      return false
    }

    var key = this.data.smartCodeId
    var eles = []
    eles.push({
      id: this.data.id,
      title: this.data.title,
      img: this.data.img,
      sort: this.data.sort,
      showMax: this.data.showMax,
      cache: true
    })
    getApp().addCache(key, eles, undefined, true)
    wx.navigateBack({
      delta: 1,
    })
  },
  chooseImg: function(){
    var that = this
    requestDataUtil.postData.chooseAndupdateImg(
      {
        width: 550,
        height: 550
      },
      function(data){
        if(util.objectUtil.verifyValidObject(that.data.img) && that.data.img != data){
          requestDataUtil.postData.delImg(
            {
              type: 2,
              id: that.data.id,
              parentId: that.data.smartCodeId,
              img: that.data.img
            }
            )
        }
        that.setData({
          img: data
        })
        that.bindblur4Img()
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)

    var id = options.id
    var smartCodeId = options.smartCodeId

    if (!util.objectUtil.verifyValidObject(smartCodeId)) {
      util.showMsg("缺少活码ID")
      throw "缺少活码ID"
    }

    this.setData({
      smartCodeId: smartCodeId
    })

    if (!util.objectUtil.verifyValidObject(id) || id == 0) {
      // gen id
      id = new Date().getTime()
      this.setData({
        id: id,
        title: "",
        sort: 1,
        showMax: 99999,
        showCount: 0,
        img: false
      })
    } else {
      var title = options.title
      var img = util.objectUtil.verifyValidObject(options.img) ? options.img : false
      var sort = options.sort
      var showMax = options.showMax
      var oldTitle = options.title
      var oldImg = options.img
      var oldSort = options.sort
      var oldShowMax = options.showMax
      var showCount = util.objectUtil.verifyValidObject(options.showCount) ? options.showCount : 0
      this.setData({
        id: id,
        title: title,
        img: img,
        sort: sort,
        showMax: showMax,
        showCount: showCount,
        oldTitle: oldTitle,
        oldImg: oldImg,
        oldSort: oldSort,
        oldShowMax: oldShowMax
      })
    }
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
   // this.tempModify()
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