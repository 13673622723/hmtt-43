<template>
  <div>
    <Header title="我的关注" />
    <div class="follows" v-for="(item,index) in myFollow" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" />
      <div class="userfollow">
        <div>{{item.nickname}}</div>
        <p>{{moment(item.create_date).format("YYYY-MM-DD")}}</p>
      </div>
      <!-- unfollowUser点击取消关注 -->
      <!-- 点击取消的时候把id和索引传过去 -->
      <div class="unfollow" @click="unfollowUser(index)">取消关注</div>
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import moment from "moment";
export default {
  data() {
    return {
      myFollow: {},
      moment,
      userJson: []
    };
  },
  components: {
    Header
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.myFollow = data;
    });
  },
  methods: {
    unfollowUser(index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消吗？"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + this.userJson.user.id,
            headers: {
              Authorization: this.userJson.token
            }
          }).then(res => {
            // console.log(res);
            const { message } = res.data;
            this.$toast.success("取消成功");
            // 点击确定是触发的函数,删除以组数据
            this.myFollow.splice(index, 1);
          });
        })
        // 点击取消什么都不用管
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less">
.follows {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20 / 375 * 100vw;
  border-bottom: 1px solid #eee;
  img {
    width: 40 / 375 * 100vw;
    height: 40 / 375 * 100vw;
    border-radius: 100%;
    object-fit: cover;
  }
  .userfollow {
    width: 150 / 375 * 100vw;
    margin-left: -20px;
    p {
      font-size: 14px;
      color: #ccc;
    }
  }
  .unfollow {
    font-size: 14px;
    background: #e1e1e1;
    border-radius: 37px;
    padding: 3px 5px;
    color: #363636;
  }
}
</style>