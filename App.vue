<script setup>
const getData = () => {
  let data = uni.getStorageSync("userData");
  if (!data) {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
};

// onLaunch() {
//   uni.showShareMenu({
//     withShareTicket: true,
//     menus: ["shareAppMessage", "shareTimeline"],
//   });
// }

getData();

</script>

<style>
/*每个页面公共css */
/* .wd-input.is-disabled .wd-input__inner.data-v-4e0c9774 {
  color: var(--wot-input-disabled-color, #d9d9d9);
  background: #d9d9d9 !important;
} */
.wd-textarea.is-auto-height::after {
  display: none;
}

:root,
page {
  --wot-cell-padding: 10px;
}

</style>
