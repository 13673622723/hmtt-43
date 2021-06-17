<template>
  <div>
    <!-- 头部组件 -->
    <div>
      <Header title="个人中心" isShow="true"/>
    </div>
    <!-- 个人信息详情 -->
    <router-link to="/edit">
      <div class="userMation">
        <div class="userItem">
          <!-- 头像 -->
          <div class="userImg">
            <img :src="$axios.defaults.baseURL+userInfo.head_img" class="img" />
          </div>
          <div class="usernames">
            <div>
              <span class="iconfont icon-xingbienan" v-if="userInfo.gender===1"></span>
              <span class="iconfont icon-xingbienv" v-if="userInfo.gender===0"></span>
              <span>{{userInfo.nickname}}</span>
            </div>
            <div>
              <span>{{moment(userInfo.create_date).format('YYYY-MM-DD')}}</span>
            </div>
          </div>
        </div>
        <div class="rightjiantou">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
    </router-link>
    <!-- 按钮列表组件 -->
    <div>
      <ButtonList
        v-for="(item,index) in btn"
        :key="index"
        :label="item.label"
        :value="item.value"
        :path="item.path"
      />
      <!-- click.native给这个组件最外层的div强制注册一个点击事件 -->
      <ButtonList label="退出" @click.native="handleClick" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ButtonList from "@/components/ButtonList";
import moment from "moment";
export default {
  data() {
    return {
      btn: [
        { label: "我的关注", value: "关注的用户", path: "/concerns" },
        { label: "我的跟帖", value: "跟贴/回复", path: "/comment" },
        { label: "我的收藏", value: "文章/视频", path: "/collection" }
      ],
      userInfo: {},
      moment
    };
  },
  components: {
    Header,
    ButtonList
  },
  methods: {
    handleClick() {
      // console.log(123);
      this.$dialog
        .confirm({
          title: "标题",
          message: "确定退出吗？"
        })
        .then(() => {
          // 点击确定是触发的函数，清除本地的 userInfo
          localStorage.removeItem("userInfo");
          // 清除本地的userInfo并返回到登录页
          this.$router.replace("/login");
        })
        // 点击取消什么都不用管
        .catch(() => {});
    }
  },
  mounted() {
    const jsonUser = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(jsonUser);

    this.$axios({
      url: "/user/" + jsonUser.user.id,
      headers: {
        Authorization: jsonUser.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.userInfo = data;
    });
  }
};
</script>

<style scoped lang="less">
.userMation {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20 / 375 * 100vw;
  border-bottom: 5px solid #f3f3f3;
  color: rgb(51, 51, 51);
  .userItem {
    display: flex;
    align-items: center;
    .userImg {
      .img {
        display: block;
        width: 70 / 375 * 100vw;
        height: 70 / 375 * 100vw;
        border-radius: 100%;
        background-color: yellow;
      }
    }
    .usernames {
      margin-left: 20 / 375 * 100vw;
      .icon-xingbienan {
        color: blue;
      }
      .icon-xingbienv {
        color: pink;
      }
    }
  }
}
</style>