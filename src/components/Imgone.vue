<template>
  <!-- 一张图片的组件 -->
  <div class="contents">
    <!-- 左边 -->
    <div class="contents_left">
      <p>{{data2.title}}</p>
      <span>{{data2.user.nickname}}</span>
      <span class="gt">{{data2.comment_length}}跟帖</span>
    </div>
    <!-- 右边 -->
    <div class="contents_right">
      <img :src="$axios.defaults.baseURL + data2.cover[0].url" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data2"]
};
</script>

<style scoped lang="less">
.contents {
  display: flex;
  height: 100/360 * 100vw;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ddd;
  &_left {
    width: 200 / 360 * 100vw;
    height: 80/360 * 100vw;
    p {
      width: 200 / 360 * 100vw;
      height: 42/360 * 100vw;
      font-size: 16px;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 15px;
    }
    span {
      font-weight: 400;
      font-size: 13px;
      color: #868686;
    }
    .gt {
      margin-left: 10px;
    }
  }
  &_right {
    img {
      width: 121/360 * 100vw;
      height: 75/360 * 100vw;
    }
  }
}
</style>