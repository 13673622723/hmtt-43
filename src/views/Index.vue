<template>
  <div>
    <div class="userTitle">
      <span class="iconfont icon-new"></span>
      <div class="search">
        <span class="iconfont icon-sousuo"></span>
        <i>搜索新闻</i>
      </div>
      <div>
        <router-link to="/personal">
          <span class="iconfont icon-wode"></span>
        </router-link>
      </div>
    </div>
    <div>
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(item,index) in titles" :key="index" :title="item">内容{{ index }}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        "关注",
        "头条",
        "娱乐",
        "体育",
        "头条",
        "娱乐",
        "体育",
        "头条",
        "娱乐",
        "体育",
        ""
      ]
    };
  }
};
</script>

<style scoped lang="less">
.userTitle {
  height: 50px;
  background-color: #ff0000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon-new {
    color: #fff;
    font-size: 50px;
  }
  .search {
    width: 210px;
    height: 34px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    .icon-sousuo {
      margin-right: 5px;
    }
  }
  .icon-wode {
    color: #fff;
    font-size: 25px;
  }
}
</style>