//index.js
//获取应用实例
const app = getApp()

const date = new Date()
const months = []
const days = []

for (let i =0; i <= 12; i++) {
  
  if (i < 10) {
    var str = "0" + i;
    months.push(str)
  }else{
    months.push(i)
  }
}

for (let i =0; i <= 59; i+=30) {
  if (i < 10) {
    var str = "0" + i;
    days.push(str)
  } else {
    days.push(i)
  }
  
}

Page({
  data: {
    banner_list:[
      {path:'../../images/banner.png'},
      { path: '../../images/banner.png' },
      { path: '../../images/banner.png' },
    ],
    price:20,

    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    num01:'00',
    num11:'02',
    num02:'',
    num12:'30',
    hours:'1',
    minute:'0',
    HOUR:60,

    showModal: false,
    selectTime: true,//是否选择时长
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

  // 支付成功
  showDialogBtn1: function () {
    this.hideModal();
    wx.setNavigationBarTitle({
      title: "购买时长"//页面标题为路由参数
    })
    this.setData({
      showModal1: true
    })
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
    wx.setNavigationBarTitle({
      title: "艾迪宝陪练机器人"//页面标题为路由参数
    })
    wx.switchTab({
      url: '/pages/orders/orders',
    })
  },
  // 确认后提交订单
  submitOrder:function(e){
    var that=this
    console.log(e)
    if(this.data.code==undefined){
      wx.scanCode({
        success(res) {
          console.log('提交扫码',res)
          var code = res.path.slice(23)
          console.log('code', code)
          that.setData({
            code: code
          })
          // 	获取设备信息
          var token = wx.getStorageSync('Authorization')
          wx.request({
            url: getApp().globalData.url + '/api/v1/device?code=' + code,
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
              // 'content-type': 'application/json;charset=utf-8',
              'Authorization': token
            },
            data: {
            },
            success: function (res) {
              console.log('设备信息', res)
              that.setData({
                sb: res.data.data
              })
              if(res.data.code==200){
                wx.navigateTo({
                  url: '/pages/submit-order/submit-order?hours=' + that.data.HOUR + '&price=' + e.currentTarget.dataset.price + '&code=' + res.data.data.code + '&storeTitle=' + res.data.data.storeTitle,
                })
              }
             else{
               wx.showToast({
                 title: res.data.message,
                 icon:'loading',
                 duration:3000,
               })
             }
            }
          })
        }
      })
    }
else{
    if (this.data.selectTime) {
      wx.navigateTo({
        url: '/pages/submit-order/submit-order?hours=' + this.data.HOUR + '&price=' + e.currentTarget.dataset.price + '&code=' + e.currentTarget.dataset.code + '&storeTitle=' + e.currentTarget.dataset.storetitle,
      })
    }
    }
  },
  ewm: function () {
    var that=this
    wx.scanCode({
      success(res) {
        console.log(res)
        var code=res.path.slice(23)
        console.log('code',code)
        that.setData({
          code: code
        })
        // 	获取设备信息
        var token = wx.getStorageSync('Authorization')
        wx.request({
          url: getApp().globalData.url + '/api/v1/device?code=' + code,
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          data: {
          },
          success: function (res) {
            console.log('设备信息', res)
            that.setData({
              sb: res.data.data
            })
          }
        })
      }
    })
    
  },
  /**
   * 监听普通picker选择器
   */
  getSelectTime:function(e){
    // console.log(e.detail.value);

    var time = e.detail.value;
    var hours=time[1];
    var minute = time[3];
    console.log(hours, minute)
    //   this.setData({
    //     hours: hours,
    //     minute: minute
    // })
    var HOUR = hours * 60 + minute*30
    // 收费
    var datas = this.data.datas
    var money = (HOUR / datas.num) * (datas.ratio.toFixed(0))
    console.log('价钱', money)
    this.setData({
      price: money,
      HOUR: HOUR
    })

    console.log('选择时间', HOUR)
    if (hours == 0 && minute==0){
      this.setData({
        selectTime:false
      })
    }else{
      this.setData({
        selectTime: true
      })
    }
    console.log(this.data.selectTime);
    if (hours==0){
      this.setData({
        num01: '12',
        num11: "0" + (hours + 1),
      })
    }else if (hours<10){
      this.setData({
        num01: "0" + (hours-1),
        num11: "0" + (hours + 1),
      })
    } else if (hours==12) {
      this.setData({
        num01: "0" + (hours - 1),
        num11:'',
      })
    }else{
      this.setData({
        num01:hours - 1,
        num11:hours + 1,
      })
    }
    if (minute ==0) {
      this.setData({
        num02:'',
        num12:30,
      })
    } else if(minute ==1){
      this.setData({
        num02:"00",
        num12:'',
      })
    }
  },
  // 余额、充值页面跳转
  toJump:function(){
    wx.navigateTo({
      url: '/pages/recharge-balance/recharge',
    })
  },
  //优惠券跳转
  toJump1: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      code: options.code
    })
    // 	获取设备信息
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/device?code=' + options.code,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('设备信息', res)
        that.setData({
          sb: res.data.data
        })
      }
    })
  

    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:2000
    })
    var that =this
    
    // 登录
    wx.login({
      success: res => {
        console.log('code', res)
        wx.request({
          url: getApp().globalData.url + '/api/v1/login?code=' + res.code,
          method: "GET",
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (res) {
            console.log('登录', res)
            if (res.data.code != 200) {
              wx.showToast({
                title: res.data.message,
                icon: 'loading',
                duration: 2000,
              })

            } else {
              wx.setStorage({
                key: 'Authorization',
                data: res.data.data,
              })
              wx.request({
                url: getApp().globalData.url + '/api/v1/index',
                method: "GET",
                header: {
                  // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                  'content-type': 'application/json;charset=utf-8',
                  'Authorization': res.data.data
                },
                data: {
                },
                success: function (res) {
                  console.log('首页', res)
                  wx.setStorage({
                    key: 'userinfo',
                    data: res.data.data.userinfo,
                  })
                    that.setData({
                      index:res.data.data

                    })
                }
              })
      
            }
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  
   

    
    
        
  },
  onShow:function(){
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/deviceRatio',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('计费规则', res)
        that.setData({
          datas: res.data.data

        })
      }
    })
  },
  
})
