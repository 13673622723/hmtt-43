<template>
  <!-- 一张图片的组件 -->
  <div class="contents">
    <!-- 上边 -->
    <div class="contents_left">
      <p>{{data.title}}</p>
    </div>
    <!-- 图片 -->
    <div class="contents_right">
      <img :src="$axios.defaults.baseURL + data.cover[0].url" />
      <div class="zhezhao">
        <i class="iconfont icon-shipin"></i>
      </div>
    </div>
    <!-- 最下边的 -->
    <div class="footer">
      <span>{{data.user.nickname}}</span>
      <span>{{data.comment_length}}跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
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
    position: relative;
    img {
      width: 340/360 * 100vw;
      height: 170/360 * 100vw;
    }
    .zhezhao {
      width: 55/360 * 100vw;
      height: 55/360 * 100vw;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      position: absolute;
      left: 43%;
      top: 32%;
      .icon-shipin {
        font-size: 40/360 * 100vw;
        color: #fff;
        position: absolute;
        left: 7px;
        top: 6px;
      }
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