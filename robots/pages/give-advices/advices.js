// pages/give-advices/advices.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal1: false,
    num:0,
  },
  // 结束
  showDialogBtn1: function () {
    var that=this
    var fbcontent = this.data.text
    console.log('fbcontent', fbcontent)
    if (fbcontent==undefined){
      wx.showToast({
        title: '请填写。。。',
        icon: "loading",
        duration: 3000,
      })
    }else{
    var token = wx.getStorageSync('Authorization')
  wx.request({
    url: getApp().globalData.url + '/api/v1/feedback',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
          fbcontent: fbcontent,
        },
        success: function (res) {
          console.log('提交意见', res)
          if(res.data.code==200){
            that.setData({
              showModal1: true
            })
          }
          else{
            wx.showToast({
              title: res.data.message,
              icon: "loading",
              duration: 3000,
            })
          }
        }
      })
    }
   
  },
  hideModal1: function () {
    this.setData({
      showModal1: false
    });
  },
  onCancel1: function () {
    this.hideModal1();
  },
  onConfirm1: function () {
    this.hideModal1();
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  text:function(e){
    console.log(e)
    this.setData({
      num: e.detail.cursor,
      text:e.detail.value
    })
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