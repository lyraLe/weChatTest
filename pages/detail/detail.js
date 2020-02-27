// pages/detail/detail.js
import request from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    articles: [],
    animationData: {},
    others: [{
      title: "朋友请听好",
      timeStamp: 1582773742210
    }, {
      title: "这就是街舞",
      timeStamp: 1582778742210
    }, {
      title: "大冰小将",
      timeStamp: 1582788742210
    }],
    hideOtherModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, title } = options;
    this.setTitle(decodeURIComponent(title));
    this.getDetail(id);
  },

  // 设置导航栏标题
  setTitle(title) {
    wx.setNavigationBarTitle({
      title
    })
  },

  // 获取详情内容
  getDetail(id) {
    request({
      url: `/detail?id=${id}`
    }).then(data => {
      this.setData({
        articles: data
      })
    })
  },
  // 选择其他
  showOther() {
    const animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      hideOtherModal: false
    });
    setTimeout(() => {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    }, 1000)
  },
  hideOther() {
    this.animation.translateY(0).step();
    this.setData({
      animationData: this.animation.export(),
      hideOtherModal: true
    });
    setTimeout(() => {
      this.animation.translateY(300).step();
      this.setData({
        animationData: this.animation.export()
      })
    }, 5000)
  },
  // 选择项
  otherItemChoose(event) {
    // 当前的title
    console.log(event.currentTarget.dataset.index)
  },
  // 打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '12343212',
      success: function() {
        // 可以记录打电话次数
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