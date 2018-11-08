// pages/user-info/change-phone/phone.js
var codes = require('../../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　
  },
  q_phone:function(e){
    this.setData({
      q_phone:e.detail.value
    })
  },
  getCodes: function () {
    var phone = this.data.q_phone
    console.log(phone)
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　//获取最初的秒数
    var token = wx.getStorageSync('Authorization')
    if (phone == undefined || phone.length < 11) {
      _this.wetoast.toast({
        title: '请输入正确手机号',
        duration: 2000,
      })
    } else {
      codes.getCode(_this, time);　　//调用倒计时函数
      wx.request({
        url: getApp().globalData.url + '/api/v1/sendCode',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
          phone: phone,
        },
        success: function (res) {
          console.log('发送验证码',res)
          if(res.data.code==200){
            _this.setData({
              code:res.data.data
            })
          }else{
            wx.showModal({
              title: '请重新发送',
              content: res.data.message,
            })
          }
          

        }
      })
    }
  },
  q_yzm:function(e){
    
    this.setData({
      yzm: e.detail.value
    })
  },
  sure:function(){
    var yzm=this.data.yzm
    var phone  = this.data.q_phone
    var code=this.data.code
    if (phone != undefined || code!=undefined){
    if (yzm == code){
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
          phone: this.data.code
        },
        success: function (res) {
          console.log('修改手机号', res)
          if (res.data.code == 200) {
              wx.showToast({
                title: '更换成功',
                duration:3000,
              })
              wx.navigateBack({
                delta:1,
              })
          }
          else{
            wx.showModal({
              title: '更换失败',
              content: res.data.message,
            })
          }

        }

      })
    }
    else{
      wx.showModal({
        title: '验证错误',
        content: '验证码错误，请重新输入',
      })
    }
    }else{
      wx.showModal({
        title: '请先输入',
        content: '请输入手机号或验证码',
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