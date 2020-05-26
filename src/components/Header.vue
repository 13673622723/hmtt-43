<template>
  <div class="header">
    <span class="iconfont icon-zuojiantou" @click="$router.back()"></span>
    <strong>{{title}}</strong>
    <!-- 如果isShow为true就显示 -->
    <span class="iconfont icon-shouye" @click="$router.push('/')" v-if="isShow"></span>
    <!-- 那么为false就把它透明度设置为0，但是不能不要，不要的话，个人中心标题就会跑到右边，因为是flex布局，设置透明度为0，显示不出来就好 -->
    <span v-else class="iconfont icon-shouye" style="opacity:0"></span>
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
  .icon-zuojiantou {
    font-size: 18px;
  }
  .icon-shouye {
    font-size: 20px;
  }
}
</style>