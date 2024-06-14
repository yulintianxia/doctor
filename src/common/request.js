// let baseUrl = 'http://139.159.155.130:8875/';
// let baseUrl ='http://dxt50u.frpnat.cn/';

/* 生产环境 */
let  baseUrl = 'https://www.bumanjianuo.com.cn/api/admin/';

// let baseUrl = "http://dxt50u.frpnat.cn/admin/";

/*
 * url:请求的接口地址
 * methodType:请求方式
 * data: 要传递的参数
 */

const request = (url, methodType = "POST", data, header) => {
  let fullUrl = `${baseUrl}${url}`;
  let Authorization = uni.getStorageSync("token") ? 'Bearer '  + uni.getStorageSync("token") : "";
  return new Promise((resolve, reject) => {
    uni.request({
      url: fullUrl,
      method: methodType,
      data,
      // header: {
      //   'content-type': 'application/json', // 默认值
      //   'token': token,
      // },
      header: header
        ? header
        : {
            "content-type": "application/json", // 默认值
            Authorization,
          },
      success: (res) => {
        console.log("res", res.statusCode);
        if (
          res.data.code == 200 ||
          res.data.code == "0000"
        ) {
          resolve(res.data.data);
        } else if (res.statusCode == 200 || res.statusCode == "0000") {
          console.log('res.statusCode', res.data);
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.msg || "请求出错，重新尝试",
            icon: "none",
            during: 3000,
          });
          reject(res.data.message);
        }
      },
      fail: () => {
        uni.showToast({
          title: "接口请求错误",
          icon: "none",
          during: 3000,
        });
        reject("接口请求错误");
      },
      complete: () => {
        setTimeout(() => {
          uni.hideLoading({
            noConflict: true,
          });
        }, 100);
      },
    });
  });
};

export { request, baseUrl };
