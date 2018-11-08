// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
  },
  showDialogBtn: function (e) {
    var endtime = e.currentTarget.dataset.endtime
    // 终止时间戳
    var stringTime = Date.parse(new Date(endtime));
    stringTime = stringTime / 1000;

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    var end = ((stringTime - timestamp)/(60*60*24)).toFixed(0)
    console.log(end)
    this.setData({
      showModal: true,
      end: end
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    this.hideModal();
    wx.navigateTo({
      url: '/pages/buy-time/buy-time?showCoupon=' + true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/coupon',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },  
      success: function (res) {
        console.log('优惠卷', res)
        that.setData({
          coupon: res.data.data

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