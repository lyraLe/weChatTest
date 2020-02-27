// pages/search/search.js
import request from '../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    showSearchResult: false,
    searchResult: [],
    hotSearch: [],
    searchHistory: [],
    noMore: false,
    noData: false,
    loading: false,
    timer: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // http请求获取数据
    request({
      url:'/hotSearch'
    }).then((result) => {
      this.setData({
        hotSearch: result,
        searchHistory: wx.getStorageSync('searchHistory') || []
      })
    });
  },
  // 搜索确认
  onConfirm(event) {
    const keyword = event.detail.value || event.currentTarget.dataset.info;
    if (keyword) {// 过滤“”
      this.setData({
        keyword
      })
      this.addHistory(keyword);
      this.searchByKeywords(keyword);
    }
  },
  // 添加历史记录缓存
  addHistory(keyword) {
    const searchHistory = wx.getStorageSync('searchHistory') || [];

    if (searchHistory.includes(keyword)) {
      return;
    }
    if (searchHistory.length > 10) {
      searchHistory.pop();
    }
    searchHistory.unshift(keyword);
    wx.setStorage({
      key: 'searchHistory',
      data: searchHistory,
      success: () => {
        this.setData({
          searchHistory
        })
      }
    })
  },
  // 搜索
  searchByKeywords(keyword) {
    this.lockOperation();// 加载中
    let start = this.data.searchResult.length;
    request({
      url: `/query?q=${keyword}&start=${start}&size=6`
    }).then(result => {
      setTimeout(() => {
        this.setQueryData(result);
        this.unLockOperation(); // 取消加载
      }, 2000);
    })
  },
  // 更新数据
  setQueryData(result) {
    this.data.total = result.total;
    // 如果该API返回数据为空
    if (result.total === 0) {
      this.setData({
        showSearchResult: true,
        noData: true
      })
    } else {
      this.setData({
        showSearchResult: true,
        searchResult: this.data.searchResult.concat(result.data)
      })        
    }
  }, 

  // 清除历史记录
  clearStorage() {
    wx.removeStorageSync("searchHistory");
    this.setData({
      searchHistory: []
    })
  },
  // 搜索页面初始化 
  onInit() {
    this.setData({
      showSearchResult: false,
      keyword: ""
    })
  },
  // 单击搜索框中的叉号
  onClear() {
    this.onInit();
  },

  //  取消后返回
  cancelBack() {
    wx.navigateBack({
      delta: 2 // 默认值为1；表示向上返回的层级数
    });
  },

  // 输入防抖操作
  changeInput() {
    clearTimeout(this.data.timer);
    this.data.timer = setTimeout(() => {
      console.log('不连续输入后触发')
    }, 300)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onInit()
  },

  // 锁住操作
  lockOperation() {
    // 加载图标
    wx.showLoading({
      title: '正在加载',
    })
    /**
     * 第二种加载图标方式
    wx.showNavigationBarLoading()
     */
    this.setData({
      loading: true
    })
  },
  
  // 打开锁住的操作
  unLockOperation() {
    // 取消加载图标
    wx.hideLoading();
    /**
     * 第二种取消加载图标方式
    wx.hideNavigationBarLoading();
     */
    this.setData({
      loading: false
    })
  },

  // 判断是否有更多数据
  hasMore() {
    return this.data.searchResult.length < this.data.total;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) {// 正在加载时，不能在进行其他请求
      return;
    }
    if (this.hasMore()) {
      let keyword = this.data.keyword;
      this.searchByKeywords(keyword);
    } else {
      this.setData({
        noMore: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})