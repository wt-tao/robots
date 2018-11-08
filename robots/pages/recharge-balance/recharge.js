// pages/recharge-balance/recharge.js
var s=-1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    ids:'',
    money:'',

    

    selectMoney:false,
  },
  showDialogBtn: function () {
    var that=this
    var id=this.data.ids
    var price=this.data.money
    console.log('price', price)
    if (price!=''){
      id=''
    }
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/recharge',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
        id: id,
        price: price,
      },
      success: function (res) {
        console.log('提交充值', res)
        var apply =JSON.parse(res.data.data)
        console.log('apply', apply)
        // let sesstion = res.data.data.session;
        //微信支付
        let timeStamp = apply.timeStamp; //new Date().getTime(),
        console.log(timeStamp)
        let nonceStr = apply.nonceStr;
        let packaged = apply.packageValue;
        let paySign = apply.paySign;
        wx.showToast({
          title: '充值中...',
          icon: 'loading',
          duration: 2000,
          success: function () {
            wx.requestPayment({
              'timeStamp': timeStamp,
              'nonceStr': nonceStr, //随机字符串，长度为32个字符以下。
              'package': packaged,
              'signType': 'MD5',
              'paySign': paySign,
              'success': function (res) {
                wx.showToast({
                  title: '支付成功',
                  duration: 2000,
                  success: function () {
                    this.setData({
                      showModal: true
                    })
                  }
                })

              },
              'fail': function (res) { },

            })
          }
        })
      }
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
  },
  //输入金额
  // getFocus: function () {
  //   // console.log("获取焦点");
  //   this.data.selectMoney = true;
  //   for (var i = 0; i < 2; i++) {
  //     this.data.couponList1[i].isChecked = false
  //     this.data.couponList0[i].isChecked = false
  //   }
  //   this.setData(this.data)
  // },
  unFocus:function(e){
    console.log(e)
    this.setData({
      money: e.detail.value
    })
    // this.data.selectMoney = !this.data.selectMoney;
    // this.setData(this.data)
  },
// 选择充值金额
  selectCoupon1:function(e){
    this.setData({
      ids: e.currentTarget.id,
      moeny:e.currentTarget.dataset.money,
      present: e.currentTarget.dataset.present,
    })
  },

  // 充值记录页面跳转
  toJump: function () {
    wx.navigateTo({
      url: '/pages/recharge-record/record',
    })
  },
  // 积分记录页面跳转
  toJump1: function () {
    wx.navigateTo({
      url: '/pages/coupon-rule/rule',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_ye: wx.getStorageSync('userinfo')
    })
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/rechargePackage?type=1',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('充值', res)
        that.setData({
          data: res.data.data

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