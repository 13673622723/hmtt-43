<template>
  <div class="btnList">
    <router-link :to="path || '#'">
      <div class="btns">
        <div class="left">{{label}}</div>
        <div class="right">
          <span class="box1">{{value}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "path"]
};
</script>

<style scoped lang="less">
.btnList {
  padding: 0 20 / 375 * 100vw;
  .btns {
    height: 60 / 375 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f3f3f3;
    .right {
      color: #a0a0a0;
      .box1 {
        margin-right: 10px;
      }
    }
  }
}
</style>