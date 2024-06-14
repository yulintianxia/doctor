<template>
  <view class="container">
    <wd-cell-group title="日报统计总数">
      <view class="top">
        <view class="center">
          <view class="center_top">
            <view class="center_info">
              <view class="center_vip">
                <view>
                  <text>纯路上:{{ dataObj.lushang }}天</text>
                  <text>走门店:{{ dataObj.mendian }} 次</text>
                </view>
                <view>
                  <text>预约坐诊: {{ dataObj.yizhen }}家</text>
                  <text>线上讲课: {{ dataObj.jiangke }} 次</text>
                </view>
                <view>
                  <text>预约坐诊出单: {{ dataObj.chudan }}罐</text>
                  <text>义诊人数: {{ dataObj.yizhenNum }}位</text>
                </view>
                <view>
                  <text>义诊成交人数: {{ dataObj.chengjiaoNum }}位</text>
                  <text>客单总价: {{ dataObj.unitPrice }}元</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </wd-cell-group>
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <wd-cell-group title="每日打卡记录">
      <view class="top" v-for="(item, index) in dataList" :key="index">
        <view class="center">
          <view class="center_top">
            <view class="center_info">
              <view class="date">{{ item.fillingDate }}</view>
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
                  <text>成交客单价: {{ item.unitPrice || 0 }}元</text>
                </view>
              </view>
            </view>
          </view>
          <view class="remark">其他工作：{{ item.otherWork || '' }}</view>
          <view class="remark">市场反馈：{{ item.marketFeedback || '' }}</view>
          <view class="remark">备注：{{ item.remark || '' }}</view>
        </view>
      </view>
      <wd-loadmore :state="state"  />
    </wd-cell-group>
  </view>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { onPageScroll, onReachBottom, onLoad } from "@dcloudio/uni-app";
let detailUrl = "doctor/daily/monthDailyInfo";
const reporterUrl = "doctor/daily/monthStatistics";
import { request } from "../common/request.js";
const dataObj = ref({
  lushang: "",
  yizhen: "",
  jiangke: "",
  mendian: "",
  chudan: '',
});

const dataList = ref([]);

const props = defineProps({
  id: '',
  current: 1,
  size: 20
})

const getData = async () => {
  let data = {
    id: props.id,
  };
  let responseData = await request(reporterUrl, "GET", data);
  console.log('responseData', responseData);
  if (responseData) {
    dataObj.value = responseData;
  }
};

onLoad((options) => {
  setTimeout(() => {
    getDataList();
  }, 100)
});

const getDataList = () => {
  getData();
  getDailyList();
};


defineExpose({
  getDataList
})

let maxNum = ref(0);
const state = ref('loading')
const current = ref(1);


/* 获取每日打开记录 */
const getDailyList = async (current = 1) => {
  let data = {
    userId: props.id,
    size: 20,
    current,
  };

  let responseData = await request(detailUrl, "GET", data);
  console.log("responseData", responseData);
  if (current == 1) {
    dataList.value = [];
  }

  if (responseData.records) {
    dataList.value = dataList.value.concat(responseData.records) || [];
    maxNum.value = responseData.total;
    if (maxNum.value <= 20) {
      state.value = 'finished'
    }
  }
};
onReachBottom(() => {
  if (dataList.value.length < maxNum.value) {
    current.value += 1;
    getDailyList(current.value);
  } else if (dataList.value.length >= maxNum.value) {
    state.value = 'finished'
  }
})


</script>
<style scoped lang="scss">
.top {
  width: 100%;
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
  margin-left: 10px;

  .date {
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }
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
  font-size: 26rpx;
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
  }
}

.remark {
  font-size: 26rpx;
  margin: 10rpx;
  margin-left: 36rpx;
}
</style>
<style>
page {
  background: #f4f4f4 !important;
}
</style>
  