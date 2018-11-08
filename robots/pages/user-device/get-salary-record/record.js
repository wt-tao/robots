// pages/recharge-record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //提现记录
    isOpen0: false,
    isOpen1: false,
    isOpen2: false,
  },
  //查看提现记录详情
  scanSalaryRecord0: function (e) {
    this.setData({
      ids: e.currentTarget.id,
    })
  },
  scanSalaryRecord1: function () {
    this.setData({
      isOpen1: !this.data.isOpen1
    })
  },
  scanSalaryRecord2: function () {
    this.setData({
      isOpen2: !this.data.isOpen2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/commissionApply',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {

      },
      success: function (res) {
        console.log('提现记录', res)
          that.setData({
            data:res.data.data
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