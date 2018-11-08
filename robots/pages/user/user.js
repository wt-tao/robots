// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identify:'0',
  },
  //跳转到个人信息页
  toUserInfo:function(){
    wx.navigateTo({
      url: '/pages/user-info/user-info',
    })
  },
  toRechargeCoupon:function(){
    wx.navigateTo({
      url: '/pages/recharge-coupon/recharge',
    })
  },
  toRechargeBalance: function () {
    wx.navigateTo({
      url: '/pages/recharge-balance/recharge',
    })
  },


  // 身份切换
  actioncnt: function () {
    var page=this;
    wx.showActionSheet({
      itemList: ['球馆', '教练', '代理商', '学员'],
      success: function (res) {
        // console.log(res.tapIndex)
        page.setData({
          identify: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log('个人中心', res)
        that.setData({
          user: res.data.data.userinfo

        })
      }
    })
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