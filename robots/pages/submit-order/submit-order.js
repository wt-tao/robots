// pages/submit-order/submit-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    prc:0,
    // sumPrice:20,
  },
  sec:function(e){
    var ids = e.currentTarget.id
    this.setData({
      ids:ids,
      prc: e.currentTarget.dataset.price,
      sumPrice:this.data.price - e.currentTarget.dataset.price,
    })
  },
  submit:function(e){
    var couponId = this.data.ids
    if (couponId==undefined){
      couponId=''
    }
    
    var time = this.data.time
    var deviceCode = 12345678   //设备号
    var payType = this.data.payType
    var orderType =0  //订单类型
    if (payType == undefined ){
      wx.showModal({
        title: '请选择',
        content: '请选择付款方式',
        success:function(r){
        
        }  
      })
    }else{
      var token = wx.getStorageSync('Authorization')
        wx.request({
          url: getApp().globalData.url + '/api/v1/order',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          data: {
            couponId: couponId,
            time: time,
            deviceCode: deviceCode,
            payType: payType,
            orderType: orderType,
          },
          success: function (res) {
            console.log('提交订单', res)
            if(res.data.code!=200){
              wx.showModal({
                title: '错误情况',
                content: res.data.message,
              })
            }
            else{
              wx.showToast({
                title: '提交成功',
                duration:3000,
                success:function(){
                  wx.reLaunch({
                    url: '../orders/orders',
                  })
                }
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
    var that = this
    console.log(options)
    console.log(options.minute)
    this.setData({
      price:options.price,
      time: options.hours,
      code: options.code,
      storeTitle: options.storeTitle,
      sumPrice: options.price
    })
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

        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        var sum = 0;
        var cou =[];
        for(var i in res.data.data){
          // 终止时间戳
          var stringTime = Date.parse(new Date(res.data.data[i].syEndTime));
          stringTime = stringTime / 1000;
          // 开始时间戳
          var strTime = Date.parse(new Date(res.data.data[i].syStartTime));
          strTime = strTime / 1000;


          console.log(res.data.data[i].syStartTime + "：开始时间戳为" + strTime);
          console.log(res.data.data[i].syEndTime + "：终止时间戳为" + stringTime);
          if (strTime < timestamp < stringTime){
            if (res.data.data[i].cvalue <= that.data.price){
              cou.push(res.data.data[i])
              that.setData({
                cou: cou
              })
              sum++;
            }
          }
        }
        that.setData({
          sum:sum
        })
        console.log('sum',sum)
        console.log('cou', cou)
        // var stringTime = res.data.data.syEndTime
        // var timestamp2 = Date.parse(new Date(stringTime));
      
        // 相距时间戳
        // var day = ((timestamp - timestamp2) / (24 * 60 * 60)).toFixed(0)
        // console.log('相距时间戳', day)
        // that.setData({
        //   coupon: res.data.data

        // })
      }
    })
  },
  showDialogBtn1:function(e){
    console.log(e)
    this.setData({
      payType:0,
      showModal: false
    })
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
    wx.setNavigationBarTitle({
      title: "扫码支付"//页面标题为路由参数
    })
  },
  hideModal: function () {
    wx.setNavigationBarTitle({
      title: "艾迪宝陪练机器人"//页面标题为路由参数
    })
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
    wx.setNavigationBarTitle({
      title: "购买时长"//页面标题为路由参数
    })
    this.showDialogBtn1();
  },

  renewSelect:function(){
    wx.navigateBack({
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