//获取应用实例
const app = getApp()

const date = new Date()
const months = []
const days = []

for (let i = 0; i <= 12; i++) {

  if (i < 10) {
    var str = "0" + i;
    months.push(str)
  } else {
    months.push(i)
  }
}

for (let i = 0; i <= 59; i += 30) {
  if (i < 10) {
    var str = "0" + i;
    days.push(str)
  } else {
    days.push(i)
  }

}

Page({
  data: {
    price: 60,
    banner_list: [
      { path: '../../images/banner.png' },
      { path: '../../images/banner.png' },
      { path: '../../images/banner.png' },
    ],

    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    num01: '00',
    num11: '02',
    num02: '',
    num12: '30',

    selectTime: true,
    showModal: false,
    showModal1: false,
    showCoupon:false,
  },
  onLoad: function (options) {
    var page = this;
    console.log(options.showCoupon);
    if (options.showCoupon != undefined && options.showCoupon != ''){
      page.setData({
        showCoupon: options.showCoupon
      })
    }
    
  },

  // 确认后提交订单
  submitOrder: function (e) {
    console.log(e)
    if (this.data.selectTime) {
      wx.navigateTo({
        url: '/pages/submit-order/submit-order?hours=' + this.data.HOUR + '&price=' + e.currentTarget.dataset.price,
      })
    }
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
    wx.setNavigationBarTitle({
      title:"扫码支付"//页面标题为路由参数
    })
  },
  hideModal: function () {
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
    wx.switchTab({
      url: '/pages/orders/orders',
    })
  },
  /**
   * 监听普通picker选择器
   */
  getSelectTime: function (e) {
    // console.log(e.detail.value);
    var time = e.detail.value;
    var hours = time[1];
    var minute = time[3];
    console.log(hours, minute)
    var HOUR = hours * 60 + minute * 30
    // 收费
    var datas = this.data.datas
    var money = (HOUR / datas.num) * (datas.ratio.toFixed(0))
    console.log('价钱', money)
    this.setData({
      price: money,
      HOUR: HOUR
    })

    console.log('选择时间', HOUR)
    if (hours == 0 && minute == 0) {
      this.setData({
        selectTime: false
      })
    } else {
      this.setData({
        selectTime: true
      })
    }
    console.log(this.data.selectTime);
    if (hours == 0) {
      this.setData({
        num01: '12',
        num11: "0" + (hours + 1),
      })
    } else if (hours < 10) {
      this.setData({
        num01: "0" + (hours - 1),
        num11: "0" + (hours + 1),
      })
    } else if (hours == 12) {
      this.setData({
        num01: "0" + (hours - 1),
        num11: '',
      })
    } else {
      this.setData({
        num01: hours - 1,
        num11: hours + 1,
      })
    }
    if (minute == 0) {
      this.setData({
        num02: '',
        num12: 30,
      })
    } else if (minute == 1) {
      this.setData({
        num02: "00",
        num12: '',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    console.log(options)
    this.setData({
      devicecode: options.devicecode,
      orderno: options.orderno,
      storetitle: options.storetitle,
    })
    this.setData({
      user_ye: wx.getStorageSync('userinfo')
    })
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/banner',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('banner', res)
        that.setData({
          banner: res.data.data

        })
      }
    })
  },
  onShow: function () {
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
