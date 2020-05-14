<template>
  <div class="header">
    <span class="iconfont iconjiantou" @click="$router.back()"></span>
    <strong>{{title}}</strong>
    <!-- 如果isShow为true就显示 -->
    <span class="iconfont iconshouye" @click="$router.push('/')" v-if="isShow"></span>
    <!-- 那么为false就把它透明度设置为0，但是不能不要，不要的话，个人中心标题就会跑到右边，因为是flex布局，设置透明度为0，显示不出来就好 -->
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  props: ["title", "isShow"]
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  padding: 20 / 375 * 100vw;
  justify-content: space-between;
  border-bottom: 1px solid #f3f3f3;
  .iconjiantou {
    font-size: 18px;
  }
  .iconshouye {
    font-size: 20px;
  }
}
</style>