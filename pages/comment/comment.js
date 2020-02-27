// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: 5,
    imgUrl: '',
    textarea: ''
  },
  // 点击星级
  tapStar(event) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      stars: index
    })
  },
  onInput(event) {
    const value = event.detail.value;
    this.setData({
      textarea: value
    })
  },
  // 单击上传
  upload() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'sourceType'],
      success: (res) => {
        // 获取图片的临时路径
        const tempImagePath = res.tempFilePaths[0];
        // 因为未执行上传操作，可以将本地地址用于图片显示
        this.setData({
          imgUrl: tempImagePath
        })
        // 正常图片的展示应该先将图片上传搭到服务器，将服务器返回的图片的服务器地址用于图片显示
        /* wx.uploadFile({
          url: '/upload',
          filePath: tempImageFile,
          name: 'file',
          header: {},
          formData: {},
          success: function(res) {
            // 获取图片的服务器地址
            this.setData({
              imgUrl
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })*/
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }, 
  submit() {
    // 进行表单校验
    if(!this.data.textarea) {
      wx.showModal({
        title: '提示',
        content: '请填写评论',
      })
    }else if(!this.data.imgUrl) {
      wx.showModal({
        title: '提示',
        content: '请上传图片',
      })
    } else {
      // 提交this.data到后台
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