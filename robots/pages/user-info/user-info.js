// pages/user-info/user-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toStaticInfo:function(e){
    wx.navigateTo({
      url: '/pages/user-info/static-info/static?phone=' + e.currentTarget.id,
    })
  },
  head_img:function(){
    var that = this
    wx.chooseImage({
      
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var token = wx.getStorageSync('Authorization')
        wx.uploadFile({
          url: getApp().globalData.url + '/api/v1/upload/image', 
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            file:res.tempFilePaths
          },
          success(res) {
            // console.log('上传图片',res)
            var data = JSON.parse(res.data)
            console.log('上传图片', data)
            var headimg = data.data
            wx.request({
              url: getApp().globalData.url + '/api/v1/userinfo',
              method: "PUT",
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                // 'content-type': 'application/json;charset=utf-8',
                'Authorization': token
              },
              data: {
                headimg: headimg
              },
              success: function (res) {
                console.log('修改头像', res)
                if(res.data.code==200){
                  that.onLoad()
                }
               
              }
            })
          }
        })
        

      }
    })
  },
  save:function(){
    wx.showToast({
      title: '保存成功',
      duration:2000,
      success:function(){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  background: function () {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var token = wx.getStorageSync('Authorization')
        wx.uploadFile({
          url: getApp().globalData.url + '/api/v1/upload/image',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            file: res.tempFilePaths
          },
          success(res) {
            // console.log('上传图片',res)
            var data = JSON.parse(res.data)
            console.log('上传图片', data)
            var background = data.data
            wx.request({
              url: getApp().globalData.url + '/api/v1/userinfo',
              method: "PUT",
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                // 'content-type': 'application/json;charset=utf-8',
                'Authorization': token
              },
              data: {
                background: background
              },
              success: function (res) {
                console.log('修改背景', res)
                if (res.data.code == 200) {
                  that.onLoad()
                }

              }
            })
          }
        })


      }
    })
  },
  name:function(e){
    var that=this
    if(e.detail.value.length<1){
      wx.showModal({
        title: '请重置',
        content: '昵称长度不足，请重新输入',
        success: function (res) { },
      })
    }else{
      var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/userinfo',
      method: "PUT",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
        name: e.detail.value
      },
      success: function (res) {
        console.log('修改昵称', res)
        if (res.data.code == 200) {
          that.onLoad()
        }

      }
    })
    }
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
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/index',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('个人信息', res)
        that.setData({
          user: res.data.data.userinfo

        })
      }
    })
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