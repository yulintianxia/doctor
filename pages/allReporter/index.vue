<template>
  <view class="container">
    <wd-cell-group title="部门医生列表">
      <view v-for="(item, index) in dataList" :key="index">
        <view class="top" @click="goDetails(item.userId)">
          <view class="center">
            <view class="center_top">
              <view class="center_img">
                <image src="/static/imgs/yisheng.png"></image>
              </view>
              <view class="center_info">
                <view class="center_name">
                  <view>{{ item.nickName }}</view>
                  <view v-if="item.sex == 0">
                    <image src="/static/imgs/man.png"></image>
                  </view>
                  <view v-else>
                    <image src="/static/imgs/woman.png"></image>
                  </view>
                </view>
                <view class="center_vip">
                  <view>
                    <text>所在地级市:{{ item.city }}</text>
                    <text>纯路上:{{ item.lushang }}天</text>      
                  </view>
                  <view>
                    <text>走门店: {{ item.mendian }} 次</text>
                    <text>线上讲课: {{ item.jiangke }} 次</text>
                  </view>
                  <view>
                    <text>预约坐诊: {{ item.yizhen }}家</text>
                    <text>义诊人数: {{ item.yizhenNum }}位</text>
                  </view>
                  <view>
                    <text>义诊成交人数:{{ item.chengjiaoNum }}位</text>
                    <text>预约坐诊出单: {{ item.chudan }}罐</text>
                  </view>
                  <view>   
                    <text>成交客单价: {{ item.unitPrice  || 0}}元</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </wd-cell-group>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onPageScroll, onReachBottom, onLoad } from "@dcloudio/uni-app";
let url = "doctor/daily/allMonthStatistics";
import { request } from "../../src/common/request.js";
const dataList = ref([]);
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});

/* 获取用户数据 */
const getData = async () => {
  let responseData = await request(url, "GET");

  console.log("responseData", responseData);
  if (responseData) {
    dataList.value = responseData || [];
  }
};

onLoad(() => {
  getData();
});

/*跳转到个人打卡记录 */
const goDetails = (userId) => {
  console.log("userId2222", userId);
  uni.navigateTo({
    url: `/pages/detailDay/index?id=${userId}`,
  });
};
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  //   height: 180rpx;
  //   background: #E3BF88;
  background: rgba(0, 0, 0, 0.05);
  padding-top: 20rpx;
  position: relative;
}

.center {
  width: 95%;
  //   height: 160rpx;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 5px;
}

.center_top {
  display: flex;
  flex-direction: row;
  width: 100%;
  //   height: 80px;
  //   margin: 0 auto;
  margin-top: 20rpx;
  margin-left: 20rpx;
  border-bottom: 1px solid #eeeeee;
}

.center_img {
  width: 50px;
  height: 50px;
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
  margin-left: 4px;
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

.vip_text {
  display: flex;
  align-items: center;
  color: #767676;
  font-size: 14rpx;
}

:deep(.tagContainer) {
  margin: 0 10rpx;
}

.center_vip {
  text {
    display: inline-block;
    width: 290rpx;
    text-align: left;
    margin-right: 8rpx;
    margin-bottom: 10rpx;
    font-size:15px;
  }
}
</style>
<style>
page {
  background: #f4f4f4 !important;
}
</style>
