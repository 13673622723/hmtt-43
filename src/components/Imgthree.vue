<template>
  <!-- 一张图片的组件 -->
  <div class="contents">
    <!-- 上边 -->
    <div class="contents_left">
      <p>{{data1.title}}</p>
    </div>
    <!-- 图片 -->
    <div class="contents_right">
      <img :src="$axios.defaults.baseURL + data1.cover[0].url" />
      <img :src="$axios.defaults.baseURL + data1.cover[1].url" />
      <img :src="$axios.defaults.baseURL + data1.cover[2].url" />
    </div>
    <!-- 最下边的 -->
    <div class="footer">
      <span>{{data1.user.nickname}}</span>
      <span>{{data1.comment_length}}跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data1"]
};
</script>

<style scoped lang="less">
.contents {
  padding: 10/360 * 100vw;
  border-bottom: 1px solid #ddd;
  &_left {
    p {
      height: 42/360 * 100vw;
      font-size: 16px;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 15px;
    }
  }
  &_right {
    img {
      width: 110/360 * 100vw;
      height: 75/360 * 100vw;
      margin-left: 2px;
    }
  }
  .footer {
    margin-top: 10px;
    span {
      font-weight: 400;
      font-size: 13px;
      color: #868686;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
  }
}
</style>