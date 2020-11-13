const util = require('./util.js')
const requestUtil = require('./request.js')
const goPageUtil = require('./goPage.js')

var postData = {
  userInfo: function (data,sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/userInfo",
      method: 'POST',
      data: data,
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("变更信息失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  /**
   * 生成活码ID
   */
  newSmartCode: function (sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/newSmartCode",
      method: 'POST',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("生成ID失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  /**
   * 保存活码
   */
  saveSmartCode: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.id)){
      util.showMsg("缺少ID")
      return  false
    }
    
    if(!util.objectUtil.verifyValidObject(data.title)){
      util.showMsg("缺少活码描述")
      return  false
    }
    
    if(!util.objectUtil.verifyValidObject(data.eles)){
      util.showMsg("缺少子码")
      return  false
    }
 
    if(!util.objectUtil.verifyValidObject(data.ownerImg)){
      data.ownerImg = ""
    }

    /* if(data.eles.length > 2){
      util.showMsg("您目前只可配置2个元素")
      return  false
    } */
 
    var array = data.eles
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(!util.objectUtil.verifyValidObject(element.id)){
        util.showMsg("缺少子码ID")
        return  false
      }
      if(!util.objectUtil.verifyValidObject(element.title)){
        util.showMsg("缺少子码标题")
        return  false
      }
      if(!util.objectUtil.verifyValidObject(element.img)){
        util.showMsg("缺少子码二维码")
        return  false
      }
      if(!util.objectUtil.verifyValidObject(element.sort)){
        util.showMsg("缺少子码优先级")
        return  false
      }
    }
    var oldEles = data.eles
    data.eles = JSON.stringify(data.eles)
   
    requestUtil.request({
      url: "/wmall/qrcode/saveSmartCode",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        data.eles = oldEles
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        data.eles = oldEles
        var index = m.indexOf("LIMIT")
        if(index != -1){
          util.showMsg(
            m,
            function(){
              goPageUtil.goPage.goExtendPower()
            }
          )
        }else{
          util.showMsg("保存活码失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
        }
      }
    })
  },
  /**
   * 选择并上传图片
   */
  chooseAndupdateImg: function(data, sucCallBack, failCallBack){
    wx.chooseImage({
      count: 1,
      success (res) {
        const tempFilePaths = res.tempFilePaths
        var filePath = tempFilePaths[0]
        wx.getImageInfo({
          src: filePath,
          success(res){
            if(res.width > data.width || res.height > data.height){
              util.showMsg("图片尺寸不可大于" + data.width + "*" + data.height)
              return false
            }else{
              wx.uploadFile({
                url: getApp().globalData.uploadPrefix + '/wmall/qrcode/upload', 
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                  "token": getApp().globalData.token,
                  "sessionId": getApp().globalData.sessionId,
                  "v": 2,
                  "t": Math.floor(new Date().getTime() / 1000),
                  "appId": getApp().globalData.appId
                },
                success (res){
                  var resultStr = JSON.stringify(res)
                  res.data = JSON.parse(res.data)
                  if (res.data.s) {
                    if (util.objectUtil.isString(res.data.d)){
                      if (res.data.d == '[]'){
                        res.data.d = []
                      }
                      res.data.d = util.jsonUtil.toJson(res.data.d)
                    }
                    sucCallBack(res.data.d)
                  } else {
                    if (resultStr.indexOf("未登录") !== -1) {
                      wx.showModal({
                        title: '提示',
                        content: '登录失效',
                        success(res) {
                          if (res.confirm) {
                            goPageUtil.goPage.goIndex()
                          }
                        }
                      })
      
                      return
                    }
      
                    var msg = res.data
                    if (util.objectUtil.isNotUndefined(res.data.m)) {
                      msg = res.data.m
                    } else if (util.objectUtil.isNotUndefined(res.data.message)){
                      msg = res.data.message
                    }
                    failCallBack(msg)
                  }
                },
                fail (res){
                  var resultStr = JSON.stringify(res)
                  if (resultStr.indexOf("未登录") !== -1) {
                    wx.showModal({
                      title: '提示',
                      content: '登录失效',
                      success(res) {
                        if (res.confirm) {
                          goPageUtil.goPage.goIndex()
                        }
                      }
                    })
      
                    return
                  }
      
                  failCallBack(resultStr)
                }
              })
            }
          }
        })
      }
    })
  },
  delSmartCode: function (id, sucCallback, failCallback) {
    if(!util.objectUtil.verifyValidObject(id)){
      util.showMsg("参数错误")
      return false
    }
    requestUtil.request({
      url: "/wmall/qrcode/delSmartCode",
      data: {
        id: id
      },
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("删除活码列表失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  delSmartCodeEle: function (data, sucCallback, failCallback) {
    if(!util.objectUtil.verifyValidObject(data)
      || !util.objectUtil.verifyValidObject(data.smartCodeId)
      || !util.objectUtil.verifyValidObject(data.id)){
      util.showMsg("参数错误")
      return false
    }
    requestUtil.request({
      url: "/wmall/qrcode/delSmartCodeEle",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("删除活码列表失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  delImg: function (data, sucCallback, failCallback) {
    if(!util.objectUtil.verifyValidObject(data) || !util.objectUtil.verifyValidObject(data.img) 
    || !util.objectUtil.verifyValidObject(data.id) || !util.objectUtil.verifyValidObject(data.type)){
      util.showMsg("参数错误")
      return false
    }
    requestUtil.request({
      url: "/wmall/qrcode/delImg",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("删除旧图片失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
}
var getData = {
  smartCodeList: function (sucCallback, failCallback) {
    // cache
    var cacheKey = 'smartCodeList'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/smartCodeList",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 10)
        }

        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取活码列表失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  smartCode: function (id, sucCallback, failCallback) {
    if(!util.objectUtil.verifyValidObject(id)){
      util.showMsg("参数错误")
      return false
    }
    // cache
    var cacheKey = 'smartCode' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/smartCode",
      data: {
        id: id
      },
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 10)
        }

        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取活码列表失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  smartCodeId: function (sucCallback, failCallback) {
    requestUtil.request({
      url: "/wmall/qrcode/smartCodeId",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取活码ID失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getShopSimpleInfo: function(sucCallback) {
    // cache
    var cache = getApp().globalData.simple
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback()
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/simple",
      data: {},
      method: 'POST',
      successCallBack: function(data){
        getApp().globalData.simple = data
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback()
        }
      },
      failCallBack: function(m){
        util.showMsg("获取店铺信息失败!" + m)
      }
    })
  },
  getAdminImg: function(sucCallback) {
    // cache
    var cacheKey = 'adminImg'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/admin",
      data: {},
      method: 'GET',
      successCallBack: function(data){
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function(m){
        util.showMsg("获取管理员联系方式失败!")
      }
    })
  },
  getBYImg: function(sucCallback) {
    // cache
    var cacheKey = 'bySiteImg'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/by",
      data: {},
      method: 'GET',
      successCallBack: function(data){
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function(m){
        util.showMsg("获取博予科技二维码失败!")
      }
    })
  },
}

module.exports = {
  postData: postData,
  getData: getData
}