// pages/orders/orders.js
var Api = require("../../utils/util.js"); 
var app = getApp();
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:'',
    date:'',
    // 日历
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentLunarList: '',
    currentObj: '',
    currentDay: '',


    // tab切换 
    currentTab:0,
    showModal: false,
    showModal1: false,
    showModal2: false,
    showModal3: false,

    //订单详情
    isOpen0:false,
    isOpen1: false,
    isOpen2: false,
  },
  inputChange:function(e){
    this.setData({
      idcard:e.detail.value
    })
  },
  shij:function(e){
    console.log(e)
    var currentYear = this.data.currentYear
    var currentMonth = this.data.currentMonth
    var date = currentYear + '-' + currentMonth + '-' + e.currentTarget.id
    console.log(date)
    this.setData({
      ids: e.currentTarget.id,
      date: date
    })
  },
  //查看订单详情
  scanOrderDetail0:function(){
      this.setData({
        isOpen0:!this.data.isOpen0
      })
  },
  scanOrderDetail1: function () {
    this.setData({
      isOpen1: !this.data.isOpen1
    })
  },
  scanOrderDetail2: function (e) {
    this.setData({
      ids: e.currentTarget.id,
    })
    // this.setData({
    //   isOpen2: !this.data.isOpen2
    // })
  },

  // 加时
  showDialogBtn: function (e) {
    var orderNo = e.currentTarget.id
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/order/close',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
        orderNo:orderNo
      },
      success: function (res) {
        console.log('结束订单按钮', res)
        if(res.data.code==200){
        this.setData({
            showModal: true
          })
        }
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
    this.setData({
      currentTab:1
    })
  },
  // 结束
  showDialogBtn1: function () {
    this.hideModal();
    this.setData({
      currentTab: 1
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
  },
  // 订单号查询
  showDialogBtn2: function () {
    this.setData({
      showModal2: true
    })
  },
  hideModal2: function () {
    this.setData({
      showModal2: false
    });
  },
  onCancel2: function () {
    this.hideModal2();
  },
  onConfirm2: function () {
    var that=this
    var idcard = this.data.idcard
    if (idcard==undefined){
      wx.showModal({
        title: '请输入',
        content: '请输入订单编号',
        success: function(res) {},  
      })
    }else{
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/order?status=1&orderNo=' + this.data.orderNo,//+ &date=' + this.data.date,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
          orderNo: idcard
        },
        success: function (res) {
          console.log('编号查询结束订单', res)
          if(res.data.data.length==0){
            wx.showModal({
              title: '未找到',
              content: '未找到该订单',
              success: function (res) { },
            })
          }
          else{
              that.setData({
                  order1: res.data.data
                })
          }
         
        }
      })
    }
    // this.hideModal2();
  },
  // 日期查询
  showDialogBtn3: function () {
    this.setData({
      showModal3: true
    })
  },
  hideModal3: function () {
    this.setData({
      showModal3: false
    });
  },
  onCancel3: function () {
    this.hideModal3();
  },
  onConfirm3: function () {
    var that =this
    var date = this.data.date
    console.log('date', date)
    if(date==''){
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
      // 当前时间
      var time = Api.formatTime(timestamp).slice(0, 10)
      date = time
    }
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/order?status=1&date=' + date,//+ &date=' + this.data.date,
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
        // orderNo: idcard
      },
      success: function (res) {
        console.log('日期结束订单', res)
        if (res.data.data.length == 0) {
          wx.showModal({
            title: '未找到',
            content: '未找到该订单',
            success: function (res) { },
          })
        }
        else {
          that.setData({
            order1: res.data.data
          })
        }

      }
    })
  
    // this.hideModal3();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
      currentDay: currentObj.getDate(),
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
    this.lunar();
  },

  // 减少年份
  doYear: function (e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    // 减少年份
    if (e.currentTarget.dataset.key == 'left0') {
      if (Y > 2017) {
        Y -= 1
        str = Y + '/' + m + '/' + d
      }
    } else {
      Y += 1
      str = Y + '/' + m + '/' + d
    }
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
  },
  // 减少月份
  doDay: function (e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    // 减少月份
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      currentYear: currentObj.getFullYear(),
      currentMonth: (currentObj.getMonth() + 1),
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1;
    var Y = currentObj.getFullYear();
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() ;//+1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = [];
    var currentLunarList = [];
    var f = 0;
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = '';
        currentLunarList[i] = '';
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1;
          f = currentDayList[i];
          if (m == 9 && currentDayList[i] == 10) {
            currentLunarList[i] = "教师节"
          } else {
            currentLunarList[i] = this.GetLunarDay(Y, m, currentDayList[i]);
          }

          // currentLunarList[i] = '农历'+f;
        } else if (f >= currentDayNum) {
          currentDayList[i] = '';
          currentLunarList[i] = '';
        }
      }
    }
    that.setData({
      currentDayList: currentDayList,
      currentLunarList: currentLunarList,
    })
  },

  //获取农历
  GetBit: function (m, n) {
    return (m >> n) & 1;
  },
  e2c: function () {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
      tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
      total++;
    }
    for (m = 0; ; m++) {
      k = (CalendarData[m] < 0xfff) ? 11 : 12;
      for (n = k; n >= 0; n--) {
        if (total <= 29 + this.GetBit(CalendarData[m], n)) {
          isEnd = true; break;
        }
        total = total - 29 - this.GetBit(CalendarData[m], n);
      }
      if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
      if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
        cMonth = 1 - cMonth;
      }
      if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
        cMonth--;
      }
    }
  },
  GetcDateString: function () {
    var tmp = "";
    // if (cMonth < 1) {
    //   tmp += "(闰)";
    //   tmp += monString.charAt(-cMonth - 1);
    // } else {
    //   tmp += monString.charAt(cMonth - 1);
    // }
    // tmp += "月";
    if (cDay == 1) {
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
    } else {
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
    }

    return tmp;
  },

  GetLunarDay: function (solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
      return "";
    } else {
      solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
      this.e2c(solarYear, solarMonth, solarDay);
      return this.GetcDateString();
    }
  },
  lunar: function () {
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    console.log("农历" + this.GetLunarDay(yy, mm, dd));
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset.current);
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current==1){
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/order?status=1',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('结束订单', res)
          //数组时间戳转换   
          var ARR_NEWS_DATA = []
          var START_TIME = []
  
          for (var i = 0; i < res.data.data.length; i++) {
          

            // 截取时间
            res.data.data[i].endTime = res.data.data[i].endTime.slice(10, 16)
            res.data.data[i].startTime = res.data.data[i].startTime.slice(10, 16)
            ARR_NEWS_DATA.push(res.data.data[i])
            START_TIME.push(res.data.data[i])
          }
          console.log('结束订单转换后数据', res.data.data)
          that.setData({
            order1: res.data.data
          })
        }
      })
    }
    if (e.detail.current == 0) {
      var that = this
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/order?status=0',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('进行中订单', res)
          //数组时间戳转换   
          var ARR_NEWS_DATA = []
          var START_TIME = []
          var time = []
          for (var i = 0; i < res.data.data.length; i++) {
            // 计算时间
            // 终止时间戳
            var stringTime = Date.parse(new Date(res.data.data[i].endTime));
            stringTime = stringTime / 1000;
            // 开始时间戳
            var strTime = Date.parse(new Date(res.data.data[i].startTime));
            strTime = strTime / 1000;
            console.log('剩余时长：', stringTime - strTime)
            var tim = stringTime - strTime

            time.push(that.formatSeconds(tim))
            console.log('剩余时间：', that.formatSeconds(tim))

            // 截取时间
            res.data.data[i].endTime = res.data.data[i].endTime.slice(10, 16)
            res.data.data[i].startTime = res.data.data[i].startTime.slice(10, 16)
            ARR_NEWS_DATA.push(res.data.data[i])
            START_TIME.push(res.data.data[i])
          }
          console.log('进行中订单转换后数据', res.data.data)
          that.setData({
            order: res.data.data,
            time: time
          })
        }
      })
    }
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 1) {
      var that = this
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/order?status=1',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('结束订单', res)
          //数组时间戳转换   
          var ARR_NEWS_DATA = []
          var START_TIME = []
 
          for (var i = 0; i < res.data.data.length; i++) {
       

            // 截取时间
            res.data.data[i].endTime = res.data.data[i].endTime.slice(10, 16)
            res.data.data[i].startTime = res.data.data[i].startTime.slice(10, 16)
            ARR_NEWS_DATA.push(res.data.data[i])
            START_TIME.push(res.data.data[i])
          }
          that.setData({
            order1: res.data.data
          })
        }
      })
    }
    if (e.target.dataset.current == 0) {
      var that = this
      var token = wx.getStorageSync('Authorization')
      wx.request({
        url: getApp().globalData.url + '/api/v1/order?status=0',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
          'Authorization': token
        },
        data: {
        },
        success: function (res) {
          console.log('进行中订单', res)
          //数组时间戳转换   
          var ARR_NEWS_DATA = []
          var START_TIME = []
          var time = []
          for (var i = 0; i < res.data.data.length; i++) {
            // 计算时间
            // 终止时间戳
            var stringTime = Date.parse(new Date(res.data.data[i].endTime));
            stringTime = stringTime / 1000;
            // 开始时间戳
            var strTime = Date.parse(new Date(res.data.data[i].startTime));
            strTime = strTime / 1000;
            console.log('剩余时长：', stringTime - strTime)
            var tim = stringTime - strTime

            time.push(that.formatSeconds(tim))
            console.log('剩余时间：', that.formatSeconds(tim))

            // 截取时间
            res.data.data[i].endTime = res.data.data[i].endTime.slice(10, 16)
            res.data.data[i].startTime = res.data.data[i].startTime.slice(10, 16)
            ARR_NEWS_DATA.push(res.data.data[i])
            START_TIME.push(res.data.data[i])
          }
          console.log('转换后数据', res.data.data)
          that.setData({
            order: res.data.data,
            time: time
          })
        }
      })
    }
  },
 toBuyTime:function(e){
   console.log(e)
   wx.navigateTo({
     url: '/pages/buy-time/buy-time?storetitle=' + e.currentTarget.dataset.storetitle + '&devicecode=' + e.currentTarget.dataset.devicecode + '&orderno=' + e.currentTarget.dataset.orderno,
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
    var that = this
    var token = wx.getStorageSync('Authorization')
    wx.request({
      url: getApp().globalData.url + '/api/v1/order?status=0',//&orderNo=' + this.data.orderNo + '&date=' + this.data.date,
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      data: {
      },
      success: function (res) {
        console.log('进行中订单', res)
           //数组时间戳转换   
        var ARR_NEWS_DATA=[]
        var START_TIME=[]
        var time=[]
        for (var i = 0; i < res.data.data.length; i++) {
            // 计算时间
          // 终止时间戳
          var stringTime = Date.parse(new Date(res.data.data[i].endTime));
          stringTime = stringTime / 1000;
          // 开始时间戳
          var strTime = Date.parse(new Date(res.data.data[i].startTime));
          strTime = strTime / 1000;
          console.log('剩余时长：', stringTime - strTime)
          var tim = stringTime - strTime
         
          time.push(that.formatSeconds(tim))
          console.log('剩余时间：',that.formatSeconds(tim))

          // 截取时间
          res.data.data[i].endTime = res.data.data[i].endTime.slice(10,16)
          res.data.data[i].startTime = res.data.data[i].startTime.slice(10, 16)
          ARR_NEWS_DATA.push(res.data.data[i])
          START_TIME.push(res.data.data[i])
        } 
        console.log('转换后数据',res.data.data)
        that.setData({
          order: res.data.data,
          time: time
        })
      }
    })
  },
  formatSeconds: function (value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
  //获取分钟，除以60取整数，得到整数分钟
  minuteTime = parseInt(secondTime / 60);
  //获取秒数，秒数取佘，得到整数秒数
  secondTime = parseInt(secondTime % 60);
  //如果分钟大于60，将分钟转换成小时
  if (minuteTime > 60) {
    //获取小时，获取分钟除以60，得到整数小时
    hourTime = parseInt(minuteTime / 60);
    //获取小时后取佘的分，获取分钟除以60取佘的分
    minuteTime = parseInt(minuteTime % 60);
  }
}
var result = "" + parseInt(secondTime) + " ";

if (minuteTime > 0) {
  result = "" + parseInt(minuteTime) + "：" + result;
}
if (hourTime > 0) {
  result = "" + parseInt(hourTime) + "：" + result;
}
return result;
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