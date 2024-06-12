<template>
  <mescroll-body
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
    class="mescrollBody"
  >
    <view v-for="(item, index) in dataList" :key="index">
      <view class="top" @click="handleDetail(item)">
        <view class="center">
          <view class="center_top">
            <view class="center_img">
              <image
                src="/static/imgs/yisheng.png"
                v-if="item.userType != 'HZ'"
              ></image>
              <image
                src="/static/imgs/bingren.png"
                v-if="item.userType == 'HZ'"
              ></image>

            </view>
            <view class="center_info">
              <view class="center_container">
                <view>{{ item.nickname }}</view>
                <view class='department'>
                     {{item.department}}
                </view>
             
             
                <view v-if="item.sex == 0">
                  <image src="/static/imgs/man.png"></image>
                </view>
                <view v-else>
                  <image src="/static/imgs/woman.png"></image>
                </view>
              </view>

              <view class='grade-container'>
                  <view>医术:&nbsp;<text class='grade'>{{ item.medicalSkillRating }}</text>&nbsp;人员:&nbsp;<text class='grade'> {{ item.moralCharacterRating }}</text>&nbsp;态度:&nbsp;<text class='grade'>{{ item.attitudeRating }} </text></view>
                </view>

              <view class="center_vip">

                <view class="vip_text">
                  <text>{{ item.introduce}}</text>
                  <wd-tag
                    custom-class="tagContainer"
                    v-for="(dataItem, index) in item.labels"
                    plain
                    type="primary"
                    >{{ dataItem }}</wd-tag
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import useMescroll from "@/uni_modules/mescroll-uni/hooks/useMescroll.js";
const { mescrollInit, downCallback, getMescroll } = useMescroll(
  onPageScroll,
  onReachBottom
);
const url = "user/page";
import { request } from "../../src/common/request.js";

const dataList = ref([]);
const upCallback = async (mescroll) => {
  let data = {
    current: mescroll.num,
    size: mescroll.size,
  };
  let responseData = await request(url, "GET", data);

  if (responseData?.records) {
    const curPageData = responseData?.records || []; // 当前页数据
    if (mescroll.num == 1) dataList.value = []; // 第一页需手动制空列表
    dataList.value = dataList.value.concat(curPageData); //追加新数据
    //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
    //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
    //mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
    //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
    //mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
    //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
    //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
    //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
    mescroll.endByPage(curPageData.length, responseData.total);
  } else {
    uni.showToast({
      title: "网络连接错误，请稍后再试",
      icon: "none",
        duration: 3000
    });
  }
};

const handleDetail = (item) => {
  uni.navigateTo({
    url: `/pages/detail/index?id=${item.userId}`,
  });
};
</script>
<style scoped lang="scss">
page {
  background: #f4f4f4;
}
.mescrollBody {
  height: 100vh;
  //  background: grey;
}
.top {
  width: 100%;
  height: 200rpx;
  //   background: #E3BF88;
  background: rgba(0, 0, 0, 0.05);
  padding-top: 20rpx;
  position: relative;
}

.center {
  width: 95%;
  // height: 160rpx;
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
  // height: 80px;
  //   margin: 0 auto;
  margin-top: 20rpx;
  margin-left: 20rpx;
  // border-bottom: 1px solid #eeeeee;
  margin-bottom:10rpx;
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
  margin-top: 14rpx;
  margin-left: 10px;
}

.center_container {
  font-size: 18px;
  display: flex;
  image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
  }
  .grade {
    color:orange;
    font-size: 36rpx;
  }
  .department {
    color:rgb(77, 128, 240);
    margin-left:10rpx;
    margin-right:10rpx;
  }
}

.vip_text {
  display: flex;
  align-items: center;
  color: #767676;
  font-size: 28rpx;
}

:deep(.tagContainer) {
  margin: 0 10rpx;
}
.grade-container {
  margin-top:10rpx;
  margin-bottom:10rpx;
  .grade {
    color:orange;
  }
}
</style>
