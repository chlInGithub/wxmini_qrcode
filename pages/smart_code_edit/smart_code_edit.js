// pages/smart_code_edit/smart_code_edit.js
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

  save:function(){
    var data = {
      id: this.data.smartCode.id,
      title: this.data.smartCodeTitle,
      ownerImg: this.data.smartCodeOwnerImg,
      codeImg: util.objectUtil.verifyValidObject(this.data.smartCode.codeImg) ? this.data.smartCode.codeImg : "",
      eles: this.data.eles
    }
    var that = this
    requestDataUtil.postData.saveSmartCode(
      data,
      function(data){
        that.data.smartCode.codeImg = data
        var array = that.data.smartCode.eles
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          element['cache'] = false
        }

        that.setData({
          smartCode: that.data.smartCode,
          eles: that.data.smartCode.eles,
          saveDone: true
        })

        try {
          getApp().delCache(that.data.smartCode.id)
        } catch (e) {
          // Do something when catch error
        }
      }
      )
  },
  chooseOwnerImg: function(){
    var that = this
    requestDataUtil.postData.chooseAndupdateImg(
      {
        width: 90,
        height: 90
      },
      function(data){
        if(util.objectUtil.verifyValidObject(that.data.smartCode.ownerImg)){
          requestDataUtil.postData.delImg(
            that.data.smartCode.ownerImg
            )
        }

        that.data.smartCodeOwnerImg = data
        that.data.smartCode.ownerImg = data
        that.setData({
          smartCodeOwnerImg: that.data.smartCodeOwnerImg,
          smartCode: that.data.smartCode
        })
      }
    )
  },
  delEle: function(event){
    var id = util.eventUtil.getParaFromEvent(event, 'id')
    var ele = util.arrayUtil.getEleById(this.data.eles, id)
    if(!util.objectUtil.verifyValidObject(ele)){
      util.showMsg("数据不存在")
      return false
    }
    var that = this

    if(ele.cache){
      try {
        var key = that.data.smartCode.id
        var value = getApp().getCache(key)
        if (util.objectUtil.verifyValidObject(value)) {
          util.arrayUtil.delEleById(value, id)
          try {
            wx.setStorageSync(key, value)
          } catch (e) { 
          }
        }
      } catch (e) {
        // Do something when catch error
      }
    }
    requestDataUtil.postData.delSmartCodeEle(
      {id:id, smartCodeId:this.data.smartCode.id}, 
      function(){
        util.arrayUtil.delEleById(that.data.eles, id)
        util.arrayUtil.delEleById(that.data.smartCode.eles, id)
        that.setData({
          smartCode: that.data.smartCode,
          eles: that.data.eles
        })
      }
    )
  },
  editEle: function(event){
    var id = util.eventUtil.getParaFromEvent(event, 'id', false)
    var param = ""
    if(!util.objectUtil.verifyValidObject(id)){
      id = 0
      param = "smartCodeId=" + this.data.smartCode.id + "&id=" + id
    }else{
      var ele = util.arrayUtil.delEleById(this.data.eles, id)
      param = "smartCodeId=" + this.data.smartCode.id + "&id=" + id + "&img=" + ele.img + "&title=" + ele.title + "&sort=" + ele.sort + "&showMax=" + ele.showMax + "&showCount=" + ele.showCount
    }
    goPageUtil.goPage.goSmartCodeEleEdit( "?" + param)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)

    var id = options.id
    var isNew = false
    if(!util.objectUtil.verifyValidObject(id) || id == 0){
      // gen id
      id = new Date().getTime()
      isNew = true
    }
    
    this.setData({
      isNew: isNew,
      smartCode: {
        id: id,
        eles: []
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  appendLocalEle: function(that){
    try {
      var key = that.data.smartCode.id
      var value = getApp().getCache(key)
      if (util.objectUtil.verifyValidObject(value) && value.length > 0) {
        var cache = value[0]
        var old = util.arrayUtil.getEleById(that.data.eles, cache.id)
        if(util.objectUtil.verifyValidObject(old)){
          old.title = cache.title
          old.showMax = cache.showMsg
          old.img = cache.img
          old.cache = cache.cache
          that.setData({
            eles: that.data.eles
          })
        }else{
          that.data.smartCode.eles = that.data.smartCode.eles.concat(value)
          that.data.eles = that.data.smartCode.eles
          that.setData({
            smartCode: that.data.smartCode,
            eles: that.data.eles
          })
        }
        
        getApp().delCache(key)
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.isNew){
      this.appendLocalEle(this)
      return true
    }

    var that = this
    requestDataUtil.getData.smartCode(
      this.data.smartCode.id,
      function(data){
        if(!util.objectUtil.verifyValidObject(data)){
          return
        }
        var smartCode = data
        that.setData({
          smartCode: smartCode,
          smartCodeTitle: smartCode.title,
          smartCodeOwnerImg: smartCode.ownerImg,
          eles: smartCode.eles
        })
        that.appendLocalEle(that)
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
    try {
      wx.removeStorageSync(this.data.smartCode.id)
    } catch (e) {
      // Do something when catch error
    }
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