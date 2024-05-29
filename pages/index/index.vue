<template>
  <view class="content">
    <image class="logo" src="/static/imgs/logo.jpg"></image>
    <view class="text-area">
      <!-- <text class="title">{{title}}</text> -->
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import {
  onPageScroll,
  onReachBottom,
  onShareAppMessage,
  onShareTimeline,
  onLoad,
  onShow
} from "@dcloudio/uni-app";

onShow(() => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
});


onLoad(()=>{
	uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
})
const share = () => {
  return {
    title: "欢迎使用布曼佳诺",
    imageUrl: "../../static/imgs/logo.jpg",
    path: "/pages/index/index",
  };
};

onShareAppMessage(() => {
  share();
});

onShareTimeline(() => {
  share();
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
