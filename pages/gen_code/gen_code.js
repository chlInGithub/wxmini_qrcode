// pages/gen_code/gen_code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin_text: "",
    showCode: true,
    codeBaseUrl: "https://wmall.5jym.com/wmall/qrcode/gen?text=",
    schemas: ["-", "https://", "http://"],
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
        title: '请输入URL',
      })
      return
    }

    if(this.data.index > 0){
      var schema = this.data.schemas[this.data.index]
      text = schema + text
    }

    var oRegUrl = new RegExp();
    oRegUrl.compile("^(https|http)://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!oRegUrl.test(text)) {
      wx.showToast({
        title: 'URL格式错误',
      })
      return false;
    }

    var encoded = encodeURIComponent(text)
    console.log(encoded)
    var codeUrl = this.data.codeBaseUrl + encoded

    wx.previewImage({
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
    })


    // ios 真机 有数据返回但一直黑屏，所以采用如下方式。
    /*wx.getImageInfo({
      src: codeUrl,
      success: function(res){
        console.log(res)
        wx.previewImage({
          urls: [res.path],
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            wx.showToast({
              title: res,
            })
          }
        })
      },
      fail: function(res){
        console.log(res)
      }
    })*/
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