// pages/recharge-balance/recharge.js
var s=-1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    ids: '',

    couponList0:[
      
      { order: 0, coupon: '50', money: '0', isChecked:false},
      { order: 1, coupon: '100', money: '0', isChecked: false},
      
    ],
    couponList1: [
      { order: 2, coupon: '200', money: '0', isChecked: false },
      { order: 3, coupon: '300', money: '0', isChecked: false },
    ],
    selectMoney: false,
  },
  // 选择充值积分
  selectCoupon:function(e) {
      // console.log(e.currentTarget.dataset.order);
      if (e.currentTarget.dataset.order < 2) {
        for (var i = 0; i < this.data.couponList1.length; i++) {
          this.data.couponList1[i].isChecked = false
        }
        if (e.currentTarget.dataset.order!=s){
          for (var i = 0; i < this.data.couponList0.length; i++) {
            if (e.currentTarget.dataset.order == i) {
              this.data.couponList0[i].isChecked = true;
              this.data.selectMoney = true;
            } else {
              this.data.couponList0[i].isChecked = false
            }
          }
        } else if (e.currentTarget.dataset.order == s){
          this.data.couponList0[s].isChecked = !this.data.couponList0[s].isChecked;
          this.data.selectMoney = !this.data.selectMoney;
        }
        
      } else if (e.currentTarget.dataset.order > 1) {
        for (var i = 0; i < this.data.couponList0.length; i++) {
          this.data.couponList0[i].isChecked = false
        }
        if (e.currentTarget.dataset.order != s) {
          for (var i = 2; i < this.data.couponList1.length + 2; i++) {
            if (e.currentTarget.dataset.order == i) {
              this.data.couponList1[i - 2].isChecked = true;
              this.data.selectMoney = true;
            } else {
              this.data.couponList1[i - 2].isChecked = false
            }
          }
        } else if (e.currentTarget.dataset.order == s) {
          this.data.couponList1[s-2].isChecked = !this.data.couponList1[s-2].isChecked;
          this.data.selectMoney = !this.data.selectMoney;
        }
      }
      s = e.currentTarget.dataset.order
      this.setData(this.data)
    },
  //立即兑换弹出框
  showDialogBtn: function () {
    var that=this
    var id=this.data.ids
    if(id==undefined){
      wx.showToast({
        title: '请选择...',
        icon:'loading',
        duration:3000,
      })
    }else{
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/jifen',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
          id: id,
        },
        success: function (res) {
          console.log('提交兑换', res)
          var apply = JSON.parse(res.data.data)
          console.log('apply', apply)
          // let sesstion = res.data.data.session;
          //微信支付
          let timeStamp = apply.timeStamp; //new Date().getTime(),
          console.log(timeStamp)
          let nonceStr = apply.nonceStr;
          let packaged = apply.packageValue;
          let paySign = apply.paySign;
          wx.showToast({
            title: '',
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

    }

  
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

  // 充值记录页面跳转
  toJump: function () {
    wx.navigateTo({
      url: '/pages/recharge-record/record',
    })
  },
  // 积分记录页面跳转
  toJump1: function () {
    wx.navigateTo({
      url: '/pages/coupon-record/record',
    })
  },

  
  // 选择兑换积分
  selectCoupon1:function(e){
    this.setData({
      ids: e.currentTarget.id,
      moeny:e.currentTarget.dataset.money,
      present: e.currentTarget.dataset.present,
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
      url: getApp().globalData.url + '/api/v1/rechargePackage?type=2',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('积分', res)
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