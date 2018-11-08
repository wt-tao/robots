// pages/fault-report/fault-report.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal1: false,
    img: false,
    file: [],//上传
    img_s: true,
    cc:false,
     urls:[],
    num: 0,
  },
  ewm:function(){
    var that=this
    wx.scanCode({
      success(res) {
        console.log('提交扫码', res)
        var code = res.path.slice(23)
        console.log('code', code)
        that.setData({
          code: code,
          cc:true
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
  // 结束
  showDialogBtn1: function () {
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
      url: '/pages/user/user',
    })
  },
  card:function(e){
    console.log(e)
    this.setData({
      card: e.detail.value
    })
  },
  fault: function (e) {
    this.setData({
      num: e.detail.cursor,
      fault: e.detail.value
    })
  },
  img:function(){
    var that = this,
      img_ = this.data.file;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        img_ = img_.concat(imgsrc);
        // img_.unshift(cover_img)
        // console.log(img_)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (img_.length > 8) {
          that.setData({
            img_s: false
          })
        }
        that.setData({
          img: true,
          file: img_
        })

      }
    })
  },
  showDialogBtn1:function(){
    var that=this
    var card = this.data.card
    var fault = this.data.fault
    if(this.data.cc==true){
      card=this.data.code
    }
    if (fault==undefined||card==undefined){
      wx.showToast({
        title: '请填写完整',
        icon:"loading",
        duration:3000,
      })
    }else{
      var token = wx.getStorageSync('Authorization')
      this.uploadimg({
        url: getApp().globalData.url + '/api/v1/upload/image',
        file: this.data.file//这里是选取的图片的地址数组
      })
      setTimeout(function(){
        wx.request({
          url: getApp().globalData.url + '/api/v1/fault',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          data: {
            deviceCode: card,
            fbcontent: fault,
            urls: that.data.urls
          },
          success: function (res) {
            console.log('提交故障', res)
            if(res.data.code==200){
              wx.showModal({
                title: '提交成功',
                content: '已提交成功',
                success:function(r){
                  if(r.confirm){
                    wx.navigateBack({
                      delta:1
                    })
                  }
                }
              })
            }
          }
        })
      },2000)
   
    }
  },
  //多张图片上传
  uploadimg: function (data) {
    // var imgs_ = this.data.imgs_
    var that = this
    var i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数

      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
        'Authorization': wx.getStorageSync('Authorization')
      },
      url: data.url,
      filePath: data.file[i],
      name: 'file',
      formData: null,
      success: (resp) => {
        var data = JSON.parse(resp.data)
        console.log('上传结果', data)
        var urls = that.data.urls;
        urls.push(data.data)
        console.log('urls', urls)
        that.setData({
          urls: urls
        })
        success++;//图片上传成r功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
       
        
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.file.length) {   //当图片传完时，停止调用        
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
         

        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
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