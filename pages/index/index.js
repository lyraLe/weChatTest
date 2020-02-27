//index.js
//获取应用实例
const app = getApp()
import request from '../../utils/request.js';

Page({
  data: {
    idots: []
  },
  onLoad() {
    request({
      url: "/getNew"
    }).then(result => {
      this.setData({
        idots: result.data
      })
    })
  },
  // 自定义事件触发
  onMyEvent(event) {
    const { detail } = event;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${detail.id}&title=${encodeURIComponent( detail.starTitle)}`,
    })
  }
})
