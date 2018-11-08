// pages/user-device/device.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010',],
    index:0,
    array1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
    index1: 0,
    array2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',  '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    index2: 0,

    array3: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010',],
    index3: 0,
    array4: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
    index4: 0,
    array5: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    index5: 0,
    yue: [{ id: 1, text: '一个月内' }, { id: 2, text: '二个月内' }, { id: 3, text: '三个月内' }, { id: 4, text: '六个月内' }, { id: 5, text: '一年内' }]
  },
  
  yues:function(e){
    var that = this
    var token = wx.getStorageSync('Authorization')

    var timestamp = Date.parse(new Date());
    console.log("当前时间戳为：" + timestamp);
    // 当前时间
    var time = util.formatTime(timestamp).slice(0, 10)

    console.log(time)
   // 减一个月的时间戳
    var tomorrow_timetamp = timestamp -30* 24 * 60 * 60*1000;  
    // 减2个月的时间戳
    var tomorrow_timetamp2 = timestamp - 60 * 24 * 60 * 60 * 1000; 
    // 减3个月的时间戳
    var tomorrow_timetamp3 = timestamp - 90 * 24 * 60 * 60 * 1000;  
    // 减6个月的时间戳
    var tomorrow_timetamp4 = timestamp - 180 * 24 * 60 * 60 * 1000;  
    // 减12个月的时间戳
    var tomorrow_timetamp5 = timestamp - 360 * 24 * 60 * 60 * 1000;   
    this.setData({
      ids: e.currentTarget.id
    })
    if (e.currentTarget.id==1){
      var endTime = util.formatTime(tomorrow_timetamp).slice(0, 10)
      console.log('endTime',endTime)
      wx.request({
        url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + time + '&endTime=' + endTime,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('一个月', res)
          var time = []
          for (var i in res.data.data) {
            res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
            time.push(res.data.data[i].createtime)
          }
          that.setData({
            num: res.data.data.length,
            data: res.data.data

          })
        }
      })
    }
    if (e.currentTarget.id == 2) {
      var endTime = util.formatTime(tomorrow_timetamp2).slice(0, 10)
      console.log('endTime', endTime)
      wx.request({
        url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + time + '&endTime=' + endTime,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('2个月', res)
          var time = []
          for (var i in res.data.data) {
            res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
            time.push(res.data.data[i].createtime)
          }
          that.setData({
            num: res.data.data.length,
            data: res.data.data

          })
        }
      })
    }
    if (e.currentTarget.id == 3) {
      var endTime = util.formatTime(tomorrow_timetamp3).slice(0, 10)
      console.log('endTime', endTime)
      wx.request({
        url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + time + '&endTime=' + endTime,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('3个月', res)
          var time = []
          for (var i in res.data.data) {
            res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
            time.push(res.data.data[i].createtime)
          }
          that.setData({
            num: res.data.data.length,
            data: res.data.data

          })
        }
      })
    }
    if (e.currentTarget.id == 4) {
      var endTime = util.formatTime(tomorrow_timetamp4).slice(0, 10)
      console.log('endTime', endTime)
      wx.request({
        url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + time + '&endTime=' + endTime,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('6个月', res)
          var time = []
          for (var i in res.data.data) {
            res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
            time.push(res.data.data[i].createtime)
          }
          that.setData({
            num: res.data.data.length,
            data: res.data.data

          })
        }
      })
    }
    if (e.currentTarget.id == 5) {
      var endTime = util.formatTime(tomorrow_timetamp5).slice(0, 10)
      console.log('endTime', endTime)
      wx.request({
        url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + time + '&endTime=' + endTime,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('一年', res)
          var time = []
          for (var i in res.data.data) {
            res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
            time.push(res.data.data[i].createtime)
          }
          that.setData({
            num: res.data.data.length,
            data: res.data.data

          })
        }
      })
    }
  },
  secb:function(e){
    var that =this
    console.log(e)
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/myDevice?startTime=' + e.currentTarget.dataset.starttime + '&endTime=' + e.currentTarget.dataset.endtime,
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('时间筛选', res)
        var time = []
        for (var i in res.data.data) {
          res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
          time.push(res.data.data[i].createtime)
        }
        that.setData({
          num: res.data.data.length,
          data: res.data.data

        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange5: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/myDevice',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('设备信息', res)
        var time = []
        for (var i in res.data.data) {
          res.data.data[i].createtime = res.data.data[i].createtime.slice(0, 10)
          time.push(res.data.data[i].createtime)
        }
        that.setData({
          num: res.data.data.length,
          data: res.data.data

        })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/v1/commission/yue',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {

      },
      success: function (res) {
        console.log('我的佣金', res)
        that.setData({
          datas: res.data.data
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