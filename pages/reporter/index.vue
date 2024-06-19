<template>
  <wd-tabs v-model="tab" @change="changeTab">
    <block v-for="(item, index) in tabs" :key="index">
      <wd-tab :title="item.title"> </wd-tab>
    </block>
  </wd-tabs>

  <view class="container-reporter" v-if="tab == 0">
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <detail-day ref="checkDayRef" :id="user.userId"></detail-day>
  </view>
  <view class="container" v-else>
    <wd-cell-group title="">
      <wd-gap bg-color="#f4f4f4"></wd-gap>
      <wd-cell>
        <template #title>
          <view class="cell-view-date">
            <wd-calendar @confirm="handleConfirm" type="date" custom-label-class="custome-label" label-width="180rpx"
              v-model="form.fillingDate" label="日期选择" />
          </view>
        </template>
      </wd-cell>

      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.city" type="" custom-input-class="custome-input" :no-border="true" suffix="suffix"
              prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入" disabled>
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isCity"
                  shape="square" @change="checkDo(8)" :disabled="checkdisabled">所在地级市</wd-checkbox>
              </template>
              <template slot="suffix">
                <wd-button type="primary" custom-class="position-btn" :disabled="!isCity || checkdisabled" size="small"
                  @click="positionLocation">定位</wd-button>
                <wd-button type="primary" size="small" :disabled="checkdisabled" @click="clearAddress">清空</wd-button>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>

      <wd-cell>
        <template #title>
          <!-- <view class="cell-view">
            <wd-input v-model="form.lushang" :no-border="true" custom-input-class="custome-input" type="number"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isLushang || checkdisabled">
              <template slot="prefix">
                <wd-checkbox custom-label-class="checkBoxsLabel" :modelValue="isLushang" shape="square"
                  @change="checkDo(1)" :disabled="checkdisabled">纯路上</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>天</text>
              </template>
            </wd-input>
          </view> -->
          <view class="cell-view">
            <wd-input v-model="form.lushang" :no-border="true" custom-input-class="custome-input" type="number"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isLushang || checkdisabled">
              <template slot="prefix">
                <wd-checkbox custom-label-class="checkBoxsLabel" :modelValue="isLushang" shape="square"
                  @change="checkDo(1)" :disabled="checkdisabled">纯路上</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>天</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.mendian" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isMendian || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isMendian"
                  shape="square" @change="checkDo(2)" :disabled="checkdisabled">走门店</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>家</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.jiangke" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isJiangke || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isJiangke"
                  shape="square" @change="checkDo(4)" :disabled="checkdisabled">线上讲课</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>次</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.yizhen" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isYizhen || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isYizhen"
                  shape="square" :disabled="checkdisabled" @change="checkDo(3)">预约坐诊</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>家</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.yizhenNum" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isYizhenNum || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isYizhenNum"
                  shape="square" @change="checkDo(6)" :disabled="checkdisabled">义诊人数</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>位</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.chengjiaoNum" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isChengjiaoNum || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isChengjiaoNum"
                  shape="square" @change="checkDo(7)" :disabled="checkdisabled">义诊成交人数</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>位</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>

      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.chudan" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isChudan || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isChudan"
                  shape="square" @change="checkDo(5)" :disabled="checkdisabled">预约坐诊出单</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>罐</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-input v-model="form.unitPrice" type="number" custom-input-class="custome-input" :no-border="true"
              suffix="suffix" prefix="prefix" :use-suffix-slot="true" :use-prefix-slot="true" placeholder="请输入"
              :disabled="!isUnitPrice || checkdisabled">
              <template slot="prefix">
                <wd-checkbox class="checkBoxsLabel" custom-label-class="checkBoxsLabel" :modelValue="isUnitPrice"
                  shape="square" @change="checkDo(9)" :disabled="checkdisabled">成交客单价</wd-checkbox>
              </template>
              <template slot="suffix">
                <text>元</text>
              </template>
            </wd-input>
          </view>
        </template>
      </wd-cell>

    </wd-cell-group>
    <wd-gap bg-color="#f4f4f4"></wd-gap>
    <wd-cell-group title="其他工作">
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-textarea class="text-area" custom-textarea-container-class="text-area" v-model="form.otherWork"
              placeholder="请填写其他工作" :no-border="true" :disabled="checkdisabled" />
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
    <wd-cell-group title="市场反馈">
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-textarea class="text-area" custom-textarea-container-class="text-area" v-model="form.marketFeedback"
              placeholder="请填写市场反馈" :no-border="true" :disabled="checkdisabled" />
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>

    <wd-cell-group title="备注">
      <wd-cell>
        <template #title>
          <view class="cell-view">
            <wd-textarea class="text-area" custom-textarea-container-class="text-area" v-model="form.remark"
              placeholder="请填写备注" :no-border="true" :disabled="checkdisabled" />
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
    <view class="container-button" v-if="!checkdisabled">
      <wd-button :disabled="btnDisabled" @click="submit">提交日报记录</wd-button>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref, nextTick, toRefs, toRaw } from "vue";
import { request } from "../../src/common/request.js";
import DetailDay from "../../src/components/index";
import QQMapWX from "../../src/assets/js/qqmap-wx-jssdk";

const checkDayRef = ref();

const url = "doctor/daily";
const reporterUrl = "doctor/daily/monthStatistics";

let btnDisabled = ref(false);

import { onPageScroll, onReachBottom, onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
const user = wx.getStorageSync("userData");
let checkurl = "doctor/daily/isDaily";

let form = reactive({
  userId: user.userId,
  fillingDate: dayjs().format("YYYY-MM-DD"),
  lushang: "",
  mendian: "",
  yizhen: "",
  jiangke: "",
  chudan: "",
  remark: "",

  yizhenNum: "",
  chengjiaoNum: "",
  city: "",
  unitPrice: "",
  otherWork: "",
  marketFeedback: "",
});

const tabs = [
  {
    id: 0,
    title: "日报记录",
  },
  {
    id: 1,
    title: "填写日报",
  },
];

let checkdisabled = ref(false);

function handleConfirm({ value }) {
  form.fillingDate = dayjs(value).format("YYYY-MM-DD");

  console.log("form.fillingDate", form.fillingDate);
  checkDay();
}

const checkDay = async () => {
  let data = {
    userId: user.userId,
    date: form.fillingDate,
  };

  let responseData = await request(checkurl, "GET", data);
  if (responseData != null) {
    setTimeout(() => {
      nextTick(() => {
        const {
          lushang,
          mendian,
          remark,
          yizhen,
          jiangke,
          fillingDate,
          chudan,
          yizhenNum,
          chengjiaoNum,
          city,
          unitPrice,
          otherWork,
          marketFeedback,
        } = responseData;
        form = Object.assign(form, {
          lushang,
          mendian,
          yizhen,
          jiangke,
          chudan,
          remark,
          fillingDate,
          yizhenNum,
          chengjiaoNum,
          city,
          unitPrice,
          otherWork,
          marketFeedback,
        });
        checkdisabled.value = true;
      });
    }, 500);
  } else {
    form = Object.assign(form, {
      lushang: "",
      mendian: "",
      yizhen: "",
      jiangke: "",
      chudan: "",
      remark: "",

      yizhenNum: "",
      chengjiaoNum: "",
      city: "",
      unitPrice: "",
      otherWork: "",
      marketFeedback: "",
    });
    isLushang.value = false;
    isMendian.value = false;
    isYizhen.value = false;
    isJiangke.value = false;
    isChudan.value = false;
    isYizhenNum.value = false;
    isChengjiaoNum.value = false;
    isCity.value = false;
    isUnitPrice.value = false;
    checkdisabled.value = false;
  }
};


const getLocationInfo = async () => {
  return new Promise((resolve) => {
    let location = {
      longitude: 0,
      latitude: 0,
      province: "",
      city: "",
      area: "",
      street: "",
      address: "",
      formatted_addresses: ""
    };
    // 使用uni.getLocation获取经纬度
    uni.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success(res) {
        location.longitude = res.longitude;
        location.latitude = res.latitude;
        // 创建实例
        const qqmapsdk = new QQMapWX({
          key: 'TDDBZ-QSKW3-AI43F-O56VP-ZRLUK-DYFZG' //这里填写自己申请的key
        });
        // 使用腾讯的逆地址解析
        qqmapsdk.reverseGeocoder({
          location,
          success(response) {
            let info = response.result;
            console.log(info);
            location.province = info.address_component.province;
            location.city = info.address_component.city;
            location.area = info.address_component.district;
            location.street = info.address_component.street;
            location.address = info.address;
            location.formatted_addresses = info.formatted_addresses.standard_address;
            location.shortCity = `${location.province}${location.city}${location.area}`
            resolve(location);
          },
        });
      },
      fail(err) {
        console.log(err)
        resolve(location);
      },
    });
  });
}
// 定位位置
const positionLocation = async () => {
  uni.getSetting({
    success(res) {
      console.log(res);
      // 如果没有授权
      if (!res.authSetting['scope.userLocation']) {
        // 则拉起授权窗口
        uni.authorize({
          scope: 'scope.userLocation',
          success() {
            //点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
            getAddress();
          },
          fail(error) {
            //点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
            console.log('拒绝授权', error)
            uni.showModal({
              title: '提示',
              content: '若点击不授权，将无法使用位置功能',
              cancelText: '不授权',
              cancelColor: '#999',
              confirmText: '授权',
              confirmColor: '#f94218',
              success(res) {
                console.log(res)
                if (res.confirm) {
                  // 选择弹框内授权
                  uni.openSetting({
                    success(res) {
                      // getAddress();
                      console.log('res',res);
                      getAddress();
                    }
                  })
                } else if (res.cancel) {
                  // 选择弹框内 不授权
                  console.log('用户点击不授权');
                }
              }
            })
          }
        })
      } else {
        // 有权限则直接获取
        getAddress();
      }
    }
  })

}

const getAddress = async () => {
  const location = await getLocationInfo()
  console.log('location', location);
  // form.value.city = location.address;
  console.log('form', form);
  form.city = location.shortCity || location.city;
}

onLoad(() => {
  checkDay();
});

const changeTab = (value) => {
  setTimeout(() => {
    if (tab.value == 0) {
      getReportDay();
    } else {
      checkDay();
    }
  }, 500);
};

const allData = ref({});
const getReportDay = () => {
  nextTick(() => {
    checkDayRef.value.getDataList();
  });
};

const tab = ref(0);

let isLushang = ref(false);
let isMendian = ref(false);
let isYizhen = ref(false);
let isJiangke = ref(false);
let isChudan = ref(false);

let isYizhenNum = ref(false);
let isChengjiaoNum = ref(false);
let isCity = ref(false);
let isUnitPrice = ref(false);

/* 确定提交日报记录 */
const checkDo = (num) => {
  switch (num) {
    case 1:
      isLushang.value = !isLushang.value;
      if (!isLushang.value) {
        form.lushang = "";
      }
      break;
    case 2:
      isMendian.value = !isMendian.value;
      if (!isMendian.value) {
        form.mendian = "";
      }
      break;
    case 3:
      isYizhen.value = !isYizhen.value;
      if (!isYizhen.value) {
        form.yizhen = "";
      }
      break;
    case 4:
      isJiangke.value = !isJiangke.value;
      if (!isJiangke.value) {
        form.jiangke = "";
      }
      break;
    case 5:
      isChudan.value = !isChudan.value;
      if (!isChudan.value) {
        form.chudan = "";
      }
      break;

    case 6:
      console.log('isYizhenNum.value', isYizhenNum.value);
      isYizhenNum.value = !isYizhenNum.value;
      if (!isYizhenNum.value) {
        form.yizhenNum = "";
      }
      break;
    case 7:
      isChengjiaoNum.value = !isChengjiaoNum.value;
      if (!isChengjiaoNum.value) {
        form.chengjiaoNum = "";
      }
      break;
    case 8:
      isCity.value = !isCity.value;
      if (!isCity.value) {
        form.city = "";
      }
      break;
    case 9:
      isUnitPrice.value = !isUnitPrice.value;
      if (!isUnitPrice.value) {
        form.unitPrice = "";
      }
      break;
  }
};

const clearAddress = () => {
  form.city = '';
}

/* 提交数据 */
const submit = async () => {
  if (
    (isLushang.value && form.lushang === "") ||
    (isJiangke.value && form.jiangke === "") ||
    (isYizhen.value && form.yizhen === "") ||
    (isMendian.value && form.mendian === "") ||
    (isChudan.value && form.chudan === "") ||
    (isYizhenNum.value && form.yizhenNum === "") ||
    (isChengjiaoNum.value && form.chengjiaoNum === "") ||
    (isCity.value && form.city === "") ||
    (isUnitPrice.value && form.unitPrice === "")
  ) {
    uni.showToast({
      title: "请把数据补充完整",
      icon: "none",
      duration: 3000,
    });
    return;
  }
  btnDisabled.value = true;
  form = {
    ...form,
    fillingDate: dayjs(form.fillingDate).format("YYYY-MM-DD"),
  };

  let responseData = await request(url, "POST", form);

  if (responseData) {
    uni.showToast({
      title: "添加成功",
      icon: "success",
      duration: 3000,
    });
    tab.value = 0;

    setTimeout(() => {
      btnDisabled.value = false;
      getReportDay();

    }, 500);
  } else {
    btnDisabled.value = false;
  }
};
</script>

<style lang="scss">
.cell-view,
.cell-view-date {
  display: flex;
  width: 96vw;
}

.checkBoxsLabel {
  width: 158rpx;
  text-align: left;
}

.custome-input {
  border: 1px solid grey !important;
  border-radius: 8rpx;
  padding-left: 6rpx !important;
}

.text-area {
  background: #f4f4f4 !important;
  width: 90vw;
  border-radius: 8rpx !important;
  height: 240rpx;
  box-sizing: border-box;
  padding: 10rpx 0 0 20rpx !important;
  margin-top: -30rpx;

  textarea {
    height: 240rpx;
  }
}

.container-button {
  width: 100%;
  text-align: center;
  margin: 20rpx auto;
}

.container-reporter {
  width: 100%;
  padding-left: 20rpx;
  box-sizing: border-box;
}

.reporter-view {
  margin-top: 20rpx;
}

.custome-label {
  width: 200rpx;
}

.position-btn {
  margin-right: 2px;
  margin-left: -4px;
}
</style>
