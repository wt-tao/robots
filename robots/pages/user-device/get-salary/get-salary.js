// pages/user-device/get-salary/get-salary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal1: false,
  },
  // 结束
  showDialogBtn1: function () {
    var that = this
    var money = this.data.money
    if(money==undefined){
      wx.showModal({
        title: '请输入',
        content: '请输入需要提现数',
        success:function(r){
        }
      })
    }
    else if (money > this.data.yj){
      wx.showModal({
        title: '提现失败',
        content: '佣金不足',
        success: function (r) {
        }
      })
    }
    else{
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/commissionApply',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
        data: money,
      },
      success: function (res) {
        console.log('提现申请', res)
          if(res.data.code==200){
            wx.showModal({
              title: '申请成功',
              content: '提交提现申请成功',
              success: function (r) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
          else{
            wx.showModal({
              title: '提现失败',
              content: res.data.message,
              success: function (r) {
              }
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
  },
  toSalaryRecord: function () {
    wx.navigateTo({
      url: '/pages/user-device/get-salary-record/record',
    })
  },
  money:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  alld: function () {
    var that = this
    var token = wx.getStorageSync('Authorization')
    if (this.data.yj == 0) {
      wx.showModal({
        title: '佣金不足',
        content: '佣金不足，无法提现',

      })
    } else {


      wx.request({
        url: getApp().globalData.url + '/api/v1/commissionApply',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
          // Type: 2,
          data: this.data.yj
        },
        success: function (res) {
          console.log('佣金全部提现', res)
          if (res.data.code == 200) {
            wx.showModal({
              title: '申请成功',
              content: '提交兑换申请成功',
              success: function (r) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            wx.showModal({
              title: '兑换失败',
              content: res.data.message,

            })
          }

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      yj: options.money
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