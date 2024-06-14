<template>
  <view class="wrapper">
    <!-- 个人资料 -->
    <view class="top">
      <view class="center">
        <view class="center_top">
          <view class="center_img">
            <image
              src="/static/imgs/yisheng.png"
              v-if="user.userType != 'HZ'"
            ></image>
            <image
              src="/static/imgs/bingren.png"
              v-if="user.userType == 'HZ'"
            ></image>
          </view>
          <view class="center_info">
            <view class="center_name">
              <view>{{ user.nickname || "暂无" }}</view>
              <view v-if="user.userType != 'HZ'">{{
                user.department
              }}</view>
              <view v-if="user.sex == 0">
                <image src="/static/imgs/man.png"></image>
              </view>
              <view v-else>
                <image src="/static/imgs/woman.png"></image>
              </view>
            </view>
            <view class="grade-container" v-if="user.userType != 'HZ'">
              <view
                >医术:&nbsp;<text class="grade">{{
                  user.medicalSkillRating
                }}</text
                >&nbsp;人员:&nbsp;<text class="grade">
                  {{ user.moralCharacterRating }}</text
                >&nbsp;态度:&nbsp;<text class="grade"
                  >{{ user.attitudeRating }}
                </text></view
              >
            </view>
            <view class="center_vip">
              <view class="vip_text">
                <text>{{ user.introduce || "暂无介绍" }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <wd-cell-group>

      <wd-cell
        title="我的日报"
        custom-class="cell-border"
        to="/pages/reporter/index"
        is-link
        center
        v-if="user.userType != 'HZ' && user.userType != 'GY'"
      >
      </wd-cell>
      <wd-cell
        title="义诊反馈"
        custom-class="cell-border"
        to="/pages/feedback/index"
        v-if="user.userType == 'HZ'"
        is-link
        center
      >
      </wd-cell>
      <wd-cell
        title="查看部门医生日报"
        to="/pages/allReporter/index"
        custom-class="cell-border"
        v-if="user.userType != 'YS' && user.userType != 'HZ'"
        is-link
        center
      >
      </wd-cell>
    </wd-cell-group>
    <!-- 其它 -->
    <view class="container-button">
      <wd-button @click="submit">退出登录</wd-button>
    </view>
    <wd-message-box />
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
let user = ref({});
import { request } from "../../src/common/request.js";
import { useMessage } from "@/uni_modules/wot-design-uni";
const url = "doctorRatings";

onShow(() => {
  let data = uni.getStorageSync("userData");
  console.log('data',data);
  if (data) {
    user.value = data;
    if (data.userType) {
      getListItem();
    }
  } else {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
});
const message = useMessage();

const submit = () => {
  message
    .confirm({
      msg: "你是否要退出登录",
      title: "退出登录",
    })
    .then(() => {
      uni.clearStorageSync();
      uni.navigateTo({
        url: "/pages/login/index",
      });
    })
    .catch(() => {
      console.log("点击了取消按钮");
    });
};

const getListItem = async () => {
  console.log("user", user);
  let responseData = await request(url + "/" + user.value.userId, "GET");
  console.log("responseData", responseData);
  if (responseData?.userId) {
    // listItem.value = responseData || {};
    user.value = {
      ...user.value,
      ...responseData,
    };
    console.log("user.value", user.value);
  }
};
</script>

<style scoped lang="scss">
Page {
  font-size: 14px;
}

.top {
  width: 100%;
  height: 130px;
  // background: #23EBB9;
  background: #7199f3;
  padding-top: 15px;
  position: relative;
}

.center {
  width: 98%;
  height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 5px;
}

.center_top {
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 80px;
  margin: 0 auto;
  margin-top: 20rpx;
}

.center_img {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  overflow: hidden;
}

.center_img image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.center_img .user_head {
  width: 100%;
  height: 100%;
}

.center_info {
  margin-left: 20px;
}

.center_name {
  font-size: 18px;
  display: flex;
  image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
  }
}

.center_phone {
  color: #bebebe;
}

.center_rank {
  width: 50%;
  height: 35px;
  display: flex;
  flex-direction: row;
}

.rank_text {
  height: 35px;
  line-height: 35px;
  margin-left: 10rpx;
  color: #aaaaaa;
}

.center_vip image {
  width: 25px;
  height: 25px;
  margin-top: 10rpx;
}

.vip_icon {
  width: 25px;
  height: 25px;
  margin-top: -10rpx;
}

.vip_text {
  margin-top: 20rpx;

  color: #aaaaaa;
}

.center_rank image {
  width: 35px;
  height: 35px;
}

.center_score {
  width: 50%;
  height: 35px;
  display: flex;
  flex-direction: row;
}

.center_score image {
  width: 35px;
  height: 35px;
}

.gif-wave {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;
  height: 100rpx;
}

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #f4f4f4;
}

.profile {
  height: 375rpx;
  background-color: #ea4451;
  display: flex;
  justify-content: center;
  align-items: center;

  .meta {
    .avatar {
      display: block;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      overflow: hidden;
    }

    .nickname {
      display: block;
      text-align: center;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }
}

.count {
  display: flex;
  margin: 0 20rpx;
  height: 120rpx;
  text-align: center;
  border-radius: 4rpx;
  background-color: #fff;

  position: relative;
  top: 10rpx;

  .cell {
    margin-top: 10rpx;
    flex: 1;
    padding-top: 20rpx;
    font-size: 27rpx;
    color: #333;
  }

  text {
    display: block;
    font-size: 24rpx;
  }
}

.orders {
  margin: 20rpx 20rpx 0 20rpx;
  padding: 40rpx 0;
  background-color: #fff;
  border-radius: 4rpx;

  .title {
    padding-left: 20rpx;
    font-size: 30rpx;
    color: #333;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #eee;
    margin-top: -30rpx;
  }

  .sorts {
    padding-top: 30rpx;
    text-align: center;
    display: flex;
  }

  [class*="icon-"] {
    flex: 1;
    font-size: 24rpx;

    &::before {
      display: block;
      font-size: 48rpx;
      margin-bottom: 8rpx;
      color: #ea4451;
    }
  }
}

.address {
  line-height: 1;
  background-color: #fff;
  font-size: 30rpx;
  padding: 25rpx 0 25rpx 20rpx;
  margin: 10rpx 20rpx;
  color: #333;
  border-radius: 4rpx;
}

.extra {
  margin: 10rpx 20rpx;
  background-color: #fff;
  border-radius: 4rpx;

  .item {
    line-height: 1;
    padding: 25rpx 0 25rpx 20rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 30rpx;
    color: #333;
  }

  button {
    text-align: left;
    background-color: #fff;

    &::after {
      border: none;
      border-radius: 0;
    }
  }
}

.icon-arrow {
  position: relative;

  &::before {
    position: absolute;
    top: 50%;
    right: 20rpx;
    transform: translateY(-50%);
  }
}

.evaluation-form {
  display: flex;
  flex-direction: column;
}

.evaluation-title {
  margin-bottom: 10px;
}

.rating-container {
  display: flex;
  justify-content: center;
}

star {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  background-color: #f5a623;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  line-height: 80px;
  font-size: 24px;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 2px solid #f5a623;
  outline: none;
  box-sizing: border-box;
  user-select: none;
  touch-action: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve3d;
  -webkit-transform-origin: left top;
  -webkit-transform: scale(1);
  -webkit-animation: none !important;
  /* to prevent zooming on iOS */
  -webkit-backface-visibility: hidden !important;
  /* to prevent zooming on iOS */

  /* to prevent zooming on iOS */
  -webkit-transform: translateZ(0) !important;

  /* to prevent zooming on iOS */
  /* to prevent zooming on iOS */
}

.detail {
  color: #315efb;
  cursor: pointer;
}
.container-button {
  width: 100%;
  text-align: center;
  margin: 50rpx auto;
  bottom: 300rpx;
}
.grade-container {
  .grade {
    color: orange;
  }
}
</style>
