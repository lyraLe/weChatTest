import BASE_URL from './config.js';
export default function request({url, data, header, method="GET"}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data,
      header,
      method,
      success: function (res) {
        console.log(res);
        if (res) {
          resolve(res.data)
          // 还需进行详细的状态码区分
        }
      },
      fail: function (res) {
        reject(res);
        // 请求接口失败，一般是网络异常等；404/500都是success回调返回的状态码
      },
      complete: function (res) {
        // 无论成功失败都会触发
      },
    })
  });
}



