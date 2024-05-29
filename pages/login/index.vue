<template>
  <view class="content">
    <view class="avatorWrapper">
      <view class="avator">
        <image class="img" src="/static/imgs/logo.jpg" mode="widthFix"></image>
      </view>
    </view>
    <view class="form">
      <template v-if="mode == 'login'">
        <view class="inputWrapper">
          <input
            class="input"
            type="tel"
            v-model="phone"
            :always-embed="true"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>
        <view class="inputWrapper">
          <input
            class="input"
            type="password"
            v-model="password"
            maxlength="6"
            placeholder="请输入密码"
          />
        </view>
      </template>
      <template v-else>
        <view class="inputWrapper">
          <input
            class="input"
            type="text"
            v-model="nickname"
            :always-embed="true"
            maxlength="10"
            placeholder="请输入用户名"
          />
        </view>
        <view class="inputWrapper">
          <input
            class="input"
            type="tel"
            v-model="phone"
            :always-embed="true"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>
        <view class="inputWrapper">
          <input
            class="input"
            type="password"
            v-model="password"
            maxlength="6"
            placeholder="请输入密码"
          />
        </view>
      </template>

      <view class="login-container">
        <wd-button
          custom-class="loginBtn"
          v-if="mode == 'login'"
          size="large"
          @click="login"
          >登录</wd-button
        >
        <wd-button custom-class="loginBtn" size="large" v-else @click="register"
          >注册</wd-button
        >
      </view>
      <view class="register-container">
        <text class="register-btn" @click="changeMode">
          {{ mode == "login" ? "注册" : "登录" }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
let url = "user/login";
let registerurl = "user/register";
import { request } from "../../src/common/request.js";
export default {
  data() {
    return {
      title: "登录",
      phone: "",
      password: "",
      username: "",
      mode: "login",
    };
  },
  onLoad() {},
  methods: {
    async login() {
      if (!this.phone || !this.password) {
        uni.showToast({
          title: "请填写数据",
          icon: "none",
          duration: 3000
        });
        setTimeout(() => {
          uni.hideToast();
        }, 200);
      } else {
        // huanzhe
        let data = {
          username: this.phone,
          password: this.password,
        };
        let responseData = await request(url, "POST", data);
        console.log("responseData", responseData);

        if (responseData.userName) {
          uni.setStorageSync("userData", responseData);

          let data = uni.getStorageSync("userData");
          console.log("datass", data);

          uni.switchTab({
            url: "/pages/index/index",
          });
        } else {
          uni.showToast({
            title: "账号或密码错误",
            icon: "none",
            duration: 3000
          });
        }
      }
    },
    async register() {
      if (!this.phone || !this.password || !this.nickname) {
        uni.showToast({
          title: "请填写数据",
          icon: "none",
          duration: 3000
        });
      } else {
        // huanzhe
        let data = {
          nickname: this.nickname,
          username: this.phone,
          password: this.password,
        };
        let responseData = await request(registerurl, "POST", data);
        console.log('responseData',responseData);
        if (responseData) {
          uni.showToast({
            title: "注册成功",
            icon: "none",
            duration: 3000

          });

          setTimeout(()=>{
            uni.navigateTo({ url: '/pages/login/index' })
          },500)
        
        } else {
          uni.showToast({
            title: "网络错误，请重新尝试",
            icon: "none",
            duration: 3000
          });
        }
      }
    },
    /* 这是注册页面 */
    changeMode() {
      this.username = "";
      this.password = "";
      this.phone = "";

      if (this.mode == "login") {
        this.mode = "register";
      } else {
        this.mode = "login";
      }

      console.log("this.nmode", this.mode);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  height: 100vh;
  overflow: hidden;
}

.content {
  background: #377eb4;
  width: 100vw;
  height: 98vh;
  overflow: hidden;
}

.avatorWrapper {
  height: 20vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.avator {
  width: 210rpx;
  width: 210rpx;
  overflow: hidden;
}

.avator .img {
  width: 100%;
  border-radius: 50%;
}

.form {
  padding: 0 100rpx;
  margin-top: 160rpx;
}

.inputWrapper {
  width: 100%;
  height: 80rpx;
  background: white;
  border-radius: 40rpx;
  box-sizing: border-box;
  padding: 0 40rpx;
  margin-top: 50rpx;
}

.inputWrapper .input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 30rpx;
}

:deep(.loginBtn) {
  width: 100% !important;
  height: 80rpx;
  border-radius: 50rpx;
  margin-top: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* width:200rpx; */
}

.loginBtn .btnValue {
  color: white;
}

.forgotBtn {
  text-align: center;
  color: #eaf6f9;
  font-size: 30rpx;
  margin-top: 40rpx;
}
.login-container {
  margin: 0 auto;
  text-align: center;
}
.register-container {
  width: 160rpx;
  float: right;
  text-align: right;

  margin-top: 20rpx;
  background: none;
  text {
    color: white;
    text-align: right;
    font-size: 28rpx;
    margin-right: 20rpx;
  }
}
</style>
