<template>
  <view>
    <wd-toast />
    <wd-form ref="form" :model="model" :rules="rules">
      <wd-cell-group custom-class="group" title="基础信息" border>
        <div class="search_name_container">
          <wd-search
            custom-class="search_input"
            placeholder="请输入姓名然后搜索"
            cancel-txt="搜索"
            :hide-cancel="true"
          />
          <wd-picker
            :columns="userNameList"
            @confirm="confirmName"
            v-model="model.search"
            use-default-slot
          >
            <wd-button @tap="search">搜索</wd-button>
          </wd-picker>
        </div>
        <span class="tips_span">请先输入名字进行搜索,没有用户请添加用户</span>

        <wd-input
          label="姓名"
          label-width="100px"
          :maxlength="20"
          show-word-limit
          prop="name"
          required
          clearable
          v-model="model.name"
          placeholder="请输入用户姓名"
        />
        <wd-input
          label="身份证号"
          label-width="100px"
          prop="ID"
          placeholder="请输入身份证号"
          v-model="model.ID"
          required
          clearable
        />
        <wd-picker
          label="性别"
          placeholder="请选择性别"
          label-width="100px"
          prop="sex"
          v-model="model.sex"
          :columns="sexlist"
          required
          clearable
        />
        <wd-input
          label="手机号"
          label-width="100px"
          prop="phone"
          placeholder="请输入手机号"
          required
          :maxlength="11"
          clearable
          v-model="model.phone"
        />
        <wd-input
          label="年龄"
          label-width="100px"
          prop="age"
          placeholder="请输入年纪"
          v-model="model.age"
          clearable 
          required
        />
      </wd-cell-group>
      <wd-cell-group custom-class="group" title="门诊信息" border>
        <wd-datetime-picker
          label="出诊时间"
          label-width="100px"
          placeholder="请选择时间"
          prop="time"
          v-model="model.time"
        />
        <wd-textarea
          label="出诊描述"
          label-width="100px"
          type="textarea"
          v-model="model.content"
          :maxlength="500"
          show-word-limit
          placeholder="请输入门诊描述"
          clearable
          prop="content"
          required
        />
        <wd-cell title="出诊图片" title-width="100px" prop="fileList">
          <wd-upload
            :file-list="model.fileList"
            action="https://ftf.jd.com/api/uploadImg"
            @change="handleFileChange"
          ></wd-upload>
        </wd-cell>
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
import { useToast } from "@/uni_modules/wot-design-uni";
import { isArray } from "@/uni_modules/wot-design-uni/components/common/util";
import { FormRules } from "@/uni_modules/wot-design-uni/components/wd-form/types";
// import { areaData } from '@/utils/area';

const model = reactive<{
  name: string;
  ID: any[];
  sex: string | number;
  phone: string | number;
  age: string | number;
}>({
  name: "",
  ID: "",
  sex: "",
  phone: "",
  age: "",
});

const rules: FormRules = {
  name: [
    {
      required: true,
      //   pattern: /\d{6}/,
      //   message: "优惠券名称6个字以上",
      //   validator: (value) => {
      //     if (value) {
      //       return Promise.resolve();
      //     } else {
      //       return Promise.reject("请输入优惠券名称");
      //     }
      //   },
    },
  ],
  ID: [
    {
      required: true,
      message: "请输入活动细则信息",
      validator: (value) => {
        if (value && value.length > 2) {
          return Promise.resolve();
        } else {
          return Promise.reject("请输入活动细则信息");
        }
      },
    },
  ],
  threshold: [
    {
      required: true,
      message: "请输入满减金额",
      validator: (value) => {
        if (value && model.price) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    },
  ],
  platform: [
    {
      required: true,
      message: "请选择推广平台",
      validator: (value) => {
        if (value && isArray(value) && value.length) {
          return Promise.resolve();
        } else {
          return Promise.reject("请选择推广平台");
        }
      },
    },
  ],
  promotion: [
    {
      required: true,
      message: "请选择推广平台",
      validator: (value) => {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject("请选择推广平台");
        }
      },
    },
  ],
  time: [
    {
      required: true,
      message: "请选择时间",
      validator: (value) => {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject("请选择时间");
        }
      },
    },
  ],
  date: [
    {
      required: true,
      message: "请选择日期",
      validator: (value) => {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    },
  ],
  address: [
    {
      required: true,
      message: "请选择地址",
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve();
        } else {
          return Promise.reject("请选择地址");
        }
      },
    },
  ],
  count: [
    {
      required: true,
      message: "发货数量需要大于1",
      validator: (value) => {
        if (Number(value) > 1) {
          return Promise.resolve();
        } else {
          return Promise.reject("发货数量需要大于1");
        }
      },
    },
  ],
  cardId: [
    {
      required: true,
      message: "请输入卡号",
      validator: (value) => {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject("请输入卡号");
        }
      },
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号",
      validator: (value) => {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    },
  ],
  fileList: [
    {
      message: "请选择活动图片",
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    },
  ],
};

const show: boolean = ref(false);

const sexlist = ref<any[]>([
  {
    value: "1",
    label: "男",
  },
  {
    value: "2",
    label: "女",
  },
]);

const userNameList = ref<any[]>([
  {
    label: "小红",
    value: 1,
  },
  {
    label: "小芳",
    value: 2,
  },
  {
    label: "小明",
    value: 3,
  },
  {
    label: "暂无",
    value: 0,
  },
]);

// 搜索用户
const search = () => {
  show.value = true;
};

const closeFun = () => {};

const select = () => {};

const toast = useToast();
const form = ref();

function handleFileChange({ fileList }) {
  model.fileList = fileList;
}

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      console.log(valid);
      console.log(errors);
    })
    .catch((error) => {
      console.log(error, "error");
    });
}

function handleIconClick() {
  toast.info("优惠券提示信息");
}

const confirmName = ({ value }) => {
  console.log(value, "eeee");
};
</script>

<style scoped lang="scss">
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  margin-top: 12px;
}
.tip {
  margin: 10px 15px 21px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 25px 21px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
.tips_span {
  text-align: center;
  color: red;
  font-size: small;
  margin-left: 30rpx;
}
.search_name_container {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
}
.search_input {
  flex-grow: 1;
}
</style>
