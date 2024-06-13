<template>
  <wd-tabs v-model="tab" @change="changeTab">
    <block v-for="item in tabs" :key="item.id">
      <wd-tab :title="item.title"> </wd-tab>
    </block>
  </wd-tabs>

  <template v-if="tab == 0">
    <view class="top list" v-for="(item, index) in list">
      <view class="center list">
        <view class="center_top list">
          <view class="center_img">
            <image src="/static/imgs/bingren.png"></image>
          </view>
          <view class="center_info">
            <view class="center_container">
              <view>匿名</view>
            </view>
            <view class="grade-container">
              <view>医术:&nbsp;<text class="grade">{{
                item.medicalSkillRating || '暂无'
              }}</text>&nbsp;人员:&nbsp;<text class="grade">
                  {{ item.moralCharacterRating || '暂无' }}</text>&nbsp;态度:&nbsp;<text class="grade">{{ item.attitudeRating
                    || '暂无' }}
                </text></view>
            </view>
            <view class="center_vip">
              <view class="vip_text">
                <text>{{ item?.remark }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  <template v-else>
    <view class="top">
      <view class="center">
        <view class="center_top">
          <view class="center_img">
            <image src="/static/imgs/yisheng.png" v-if="listItem.userType != 'HZ'"></image>
            <image src="/static/imgs/bingren.png" v-else></image>

          </view>
          <view class="center_info">
            <view class="center_container">
              <view>{{ listItem.nickname }}</view>
              <view class="department">
                {{ listItem.department }}
              </view>
              <view v-if="listItem.sex == 0">
                <image src="/static/imgs/man.png"></image>
              </view>
              <view v-else>
                <image src="/static/imgs/woman.png"></image>
              </view>
            </view>
            <view class="center_vip">
              <view class="vip_text">
                <text>{{ listItem?.introduce }}</text>
                <wd-tag custom-class="tagContainer" v-for="(dataItem, index) in listItem.labels" plain type="primary">{{
                  dataItem }}</wd-tag>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <wd-cell-group>
      <wd-cell>
        <view class="cell-view">
          <view> 医术评价：</view>
          <view>
            <wd-rate :readonly="isFill" v-model="form.medicalSkillRating" />
          </view>
        </view>
      </wd-cell>
      <wd-cell>
        <view class="cell-view">
          <view>人员评价：</view>
          <view>
            <wd-rate :readonly="isFill" v-model="form.moralCharacterRating" />
          </view>
        </view>
      </wd-cell>
      <wd-cell>
        <view class="cell-view">
          <view>态度评价：</view>
          <view>
            <wd-rate :readonly="isFill" v-model="form.attitudeRating" />
          </view>
        </view>
      </wd-cell>
    </wd-cell-group>
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <wd-cell-group title="备注">
      <wd-cell>
        <view class="cell-view-container">
          <wd-textarea custom-textarea-container-class="text-area" custom-textarea-class="text-area-container"
            v-model="form.remark" placeholder="请填写备注" :maxlength="300" :no-border="true" :disabled="isFill" />
        </view>
      </wd-cell>
    </wd-cell-group>
    <view class="container-button" v-if="!isFill">
      <wd-button @click="submit">提交评价</wd-button>
    </view>
  </template>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const listItem = ref([]);
const userId = ref();
const url = "doctorRatings";
const remarkUrl = "doctorRatings/isEvaluation";
const gradeList = `doctorRatings/evaluationList`;


import dayjs from "dayjs";
import { request } from "../../src/common/request.js";

const tabs = [
  {
    id: 0,
    title: "评价列表",
  },
  {
    id: 1,
    title: "评价详情",
  },
];

const tab = ref(0);

const getListItem = async () => {
  let responseData = await request(url + "/" + userId.value, "GET");
  console.log("responseData", responseData);
  if (responseData?.userId) {
    listItem.value = responseData || {};
    console.log('listItem.value', listItem.value);
  }
};

const isFill = ref(false);
const user = uni.getStorageSync("userData");
let form = reactive({
  userId: "",
  evaluatorId: `${user.userId}`,
  evaluationDate: dayjs().format("YYYY-MM-DD"),
  medicalSkillRating: 0,
  moralCharacterRating: 0,
  attitudeRating: 0,
  remark: "",
});

const list = ref([]);

onLoad((options) => {
  userId.value =  `${options.id}`;
  getList();
});

const changeTab = () => {
  console.log("tab", tab);
  setTimeout(() => {
    if (tab.value == 0) {
      getList();
    } else {
      getListItem();
      checkIsRemark();
    }
  });
};

/* 获取当前医生的评价列表 */
const getList = async () => {
  let data = {
    userId: `${userId.value}`  , // 医生的id
    size: 99999999,
    current: 1,
  };
  let responseData = await request(gradeList, "GET", data);
  console.log("responseData", responseData);
  if (responseData.records?.length > 0) {
    list.value = responseData.records || [];
  } else {
    uni.showToast({
      title: "暂无评价",
      duration: 3000,
    });
  }
};

/* 判断是否评价了 */
const checkIsRemark = async () => {
  let data = {
    userId: `${userId.value}`, // 医生的id
    evaluatorId:`${user.userId}`, // 患者id
  };

  let responseData = await request(remarkUrl, "GET", data);

  if (responseData?.medicalSkillRating) {
    console.log("respons", responseData);

    isFill.value = true;
    form = Object.assign({}, form, { ...responseData });
  } else {
    isFill.value = false;
  }
};

const submit = async () => {
  console.log("form", form);
  if (
    form.medicalSkillRating == "" ||
    form.attitudeRating == "" ||
    form.moralCharacterRating == ""
  ) {
    uni.showToast({
      title: "请把数据补充完整",
      icon: "none",
      duration: 3000,
    });
    return;
  } else {
    form.userId = userId.value;
    let responseData = await request(url, "POST", form);
    if (responseData) {
      uni.showToast({
        title: "添加成功",
        icon: "success",
        duration: 3000,
      });

      tab.value = 0;
      getList();
    } else {
      uni.showToast({
        title: "添加失败，重新尝试",
        icon: "error",
        duration: 3000,
      });
    }
  }
};
</script>
<style lang="scss">
.top {
  width: 100%;
  height: 180rpx;
  //   background: #E3BF88;
  background: rgba(0, 0, 0, 0.05);
  padding-top: 20rpx;
  position: relative;

  &.list {
    height: auto;
  }
}

.center {
  width: 95%;
  height: 160rpx;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 5px;

  &.list {
    height: auto;
  }
}

.center_top {
  display: flex;
  flex-direction: row;
  height: 80px;
  //   margin: 0 auto;
  margin-top: 20rpx;
  margin-left: 20rpx;
  border-bottom: 1px solid #eeeeee;

  &.list {
    height: auto;
  }
}

.center_img {
  width: 66px;
  height: 66px;
  border-radius: 50%;
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
  margin-top: 14rpx;
  margin-left: 10px;
  box-sizing: border-box;
  width: calc(100% - 66rpx);
}

.center_container {
  font-size: 18px;
  display: flex;

  image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
  }

  image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
  }

  .grade {
    color: orange;
    font-size: 36rpx;
  }

  .department {
    color: rgb(77, 128, 240);
    margin-left: 10rpx;
    margin-right: 10rpx;
  }
}

.vip_text {
  display: flex;
  align-items: center;
  color: #767676;
  font-size: 28rpx;
  margin-bottom: 10rpx;
}

:deep(.tagContainer) {
  margin: 0 10rpx;
}

.cell-view {
  width: 90vw;
  display: flex;
  justify-content: space-between;
  margin-right: 20rpx;
}

.text-area {
  background: #f4f4f4 !important;
  width: 100%;
  border-radius: 8rpx !important;
  height: 300rpx;
  box-sizing: border-box;
  padding: 10rpx 0 0 20rpx !important;
  margin-top: -30rpx;

  textarea {
    height: 300rpx;
  }
}

.cell-view-container {
  // display: flex;
  // width: 90vw;
  // height: 400rpx;
  // box-sizing: border-box;
  // background: #f4f4f4;
  margin: 0 auto;
  width: 92vw;
}

.container-button {
  width: 100%;
  text-align: center;
  margin: 20rpx auto;
}

.grade-container {
  margin-top: 10rpx;
  margin-bottom: 10rpx;

  .grade {
    color: orange;
  }
}

:deep(.text-area-container) {
  background: #f4f4f4;
  padding-left: 10rpx;
  margin-top: -10rpx;
}

.center_vip {
  overflow: hidden;
}
</style>
