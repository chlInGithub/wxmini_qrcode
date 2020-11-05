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
    getApp().addCache(key, eles)
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
        if(util.objectUtil.verifyValidObject(that.data.img)){
          requestDataUtil.postData.delImg(
            that.data.img
            )
        }
        that.setData({
          img: data
        })
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
        showMax: 99999
      })
    } else {
      var title = options.title
      var img = options.img
      var sort = options.sort
      var showMax = options.showMax
      var showCount = options.showCount
      this.setData({
        id: id,
        title: title,
        img: img,
        sort: sort,
        showMax: showMax,
        showCount: showCount
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