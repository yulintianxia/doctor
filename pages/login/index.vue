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
          <input class="input" type="text" v-model="username" :always-embed="true"  placeholder="请输入用户名" />
        </view>
        <view class="inputWrapper">
          <input class="input" type="password" v-model="password" maxlength="6" placeholder="请输入密码" />
        </view>
      </template>
      <template v-else>
        <!-- <view class="inputWrapper">
          <input class="input" type="text" v-model="username" :always-embed="true" maxlength="30" placeholder="请输入姓名" />
        </view> -->
        <view class="inputWrapper">
          <input class="input" type="tel" v-model="phone" :always-embed="true" maxlength="11" placeholder="请输入手机号(手机号即用户名)" />
        </view>
        <view class="inputWrapper">
          <input class="input" type="password" v-model="password" placeholder="请输入密码" />
        </view>

     
        <!--
        <view class="inputWrapper">
          <wd-picker :columns="roles" label="角色" :display-format="checkRole" v-model="role" @confirm="handleConfirm" />
        </view>
        <view class="inputWrapper">
          <wd-picker :columns="deptIds" label="部门" v-model="deptId" @confirm="handleConfirm" />
        </view>
        <view class="inputWrapper">
          <wd-picker :columns="posts" label="岗位" v-model="post" @confirm="handleConfirm" />
        </view>
      --->
      </template>

      <view class="login-container">
        <wd-button custom-class="loginBtn" v-if="mode == 'login'" size="large" @click="login">登录</wd-button>
        <wd-button custom-class="loginBtn" size="large" v-else @click="register">注册</wd-button>
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
let url = "oauth2/token";
let registerurl = "register/user";
let roleUrl = 'role/list';
let postUrl = 'post/list';
let treeUrl = 'dept/tree';
import { request } from "../../src/common/request.js";
import { VITE_OAUTH2_PASSWORD_CLIENT, userTypeArray, userTypeEnum, VITE_OAUTH2_MOBILE_CLIENT, VITE_PWD_ENC_KEY, FORM_CONTENT_TYPE, encryption } from '@/src/common/config.js';
import { btoa } from '../../src/common/base64.js';
export default {
  data() {
    return {
      title: "登录",
      phone: "",
      password: "",
      username: "",
      mode: "login",
      roles: [],
      deptIds: [],
      posts: [],
    };
  },
  onLoad() {

  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        uni.showToast({
          title: "请填写数据",
          icon: "none",
          duration: 3000
        });
        setTimeout(() => {
          uni.hideToast();
        }, 200);
      } else {
        const basicAuth = 'Basic ' + btoa(VITE_OAUTH2_PASSWORD_CLIENT);
        uni.setStorageSync("basicAuth", basicAuth);
        let encPassword = this.password;
        // 密码加密
        if (VITE_PWD_ENC_KEY) {
          encPassword = encryption(encPassword, VITE_PWD_ENC_KEY);
        }
        let data = {
          username: this.username,
          password: encPassword,
          grant_type: 'password',
          scope: 'server'
        };
        let header = {
          skipToken: true,
          Authorization: basicAuth,
          'Content-Type': FORM_CONTENT_TYPE,
        }
        let responseData = await request(url, "POST", data, header);
        console.log("responseData", responseData);
        if (responseData.username) {
          let authorities = responseData.user_info.authorities;
          let userType = '';
          authorities.map((item) => {
            if (userTypeArray.includes(item.authority)) {
              userType = userTypeEnum[item.authority];
              return
            }
          })
          console.log('userType', userType);
          let userData = {
            username: responseData.username,
            userId: responseData.user_id,
            userType
          }

          uni.setStorageSync("userData", userData);

          let data = uni.getStorageSync("userData");
          console.log('data', data);
          uni.setStorageSync("token", responseData.access_token);
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
      if (!this.phone || !this.password ) {
        uni.showToast({
          title: "请填写数据",
          icon: "none",
          duration: 3000
        });
      } else {
        // huanzhe
        let data = {
          username: this.phone,
          password: this.password,
          phone:this.phone,
        };
        let responseData = await request(registerurl, "POST", data);
        console.log('responseData', responseData);
        if (responseData) {
          uni.showToast({
            title: "注册成功",
            icon: "none",
            duration: 3000

          });

          setTimeout(() => {
            uni.navigateTo({ url: '/pages/login/index' })
          }, 500)

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
        // this.options();
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
  margin-top: 120rpx;
}

.inputWrapper {
  width: 100%;
  height: 90rpx;
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
