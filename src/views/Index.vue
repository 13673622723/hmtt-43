<template>
  <div>
    <!-- 头部栏 -->
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
    <!-- 导航栏 -->
    <div>
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(item,index) in titles" :key="index" :title="item.name">
          <!-- vant list组件 -->
          <van-list
            :immediate-check="false"
            v-model="titles[active].loading"
            :finished="titles[active].finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 数据 -->
            <div v-for="(item,index) in titles[active].posts" :key="index">
              <ImgOne
                v-if="item.cover.length > 0 && item.cover.length < 3 && item.type === 1"
                :data="item"
              />
              <ImgThree v-if="item.cover.length >= 3 && item.type === 1" :data1="item" />
              <Videoone v-if="item.type === 2" :data2="item" />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ImgOne from "@/components/Imgone";
import ImgThree from "@/components/Imgthree";
import Videoone from "@/components/Videoone";
export default {
  data() {
    return {
      // 栏目数据
      titles: [],
      active: 0,
      // 文章列表
      // list: [],
      //loading: false,
      //finished: false,
      // pageIndex:1, //当前页数
      // pageSize:10 //数据条数
      // 记录id
      titleId: 999
    };
  },
  watch: {
    active() {
      // console.log(this.active);
      if (this.active === this.titles.length - 1) {
        this.$router.push("/栏目");
        return;
      }
      this.getList();
    }
  },
  components: {
    ImgOne,
    ImgThree,
    Videoone
  },
  mounted() {
    const titles = JSON.parse(localStorage.getItem("titles"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (titles) {
      if (titles[0].name !== "关注" && token) {
        this.getTitles(token);
        return;
      }
      if (titles[0].name === "关注" && !token) {
        this.getTitles();
        return;
      }
      this.titles = titles;
      this.handeleTitle();
    } else {
      this.getTitles(token);
    }
    this.$axios({
      url: "/post",
      params: {
        pageIndex: 1,
        pageSize: 5,
        category: this.titleId
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.titles[this.active].posts = data;
    });
  },
  methods: {
    handeleTitle() {
      this.titles = this.titles.map(v => {
        v.pageIndex = 1;
        (v.posts = []), (v.loading = false), (v.finished = false);
        return v;
      });
      // console.log(this.titles);
    },
    getTitles(token) {
      const config = {
        url: "/category"
      };
      if (token) {
        config.headers = { Authorization: token };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        data.push({
          name: "V"
        });
        // console.log(data);
        this.titles = data;
        localStorage.setItem("titles", JSON.stringify(data));
      });
    },
    onLoad() {
      this.titles[this.active].pageIndex += 1;
      this.getList();
    },
    getList() {
      if(this.titles[this.active].finished){
        return;
      }
      const { pageIndex, id, posts } = this.titles[this.active];
      this.$axios({
        url: "/post",
        params: {
          pageIndex: pageIndex,
          pageSize: 5,
          category: id
        }
      }).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.titles[this.active].posts = [...posts, ...data];
        // 加载状态结束
        this.titles[this.active].loading = false;

        if (this.titles[this.active].posts.length === total) {
          this.titles[this.active].finished = true;
        }
        this.titles = [...this.titles];
      });
    }
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
      color:rgb(153, 153, 153)
      // color:rgba(219, 234, 253, 0.5)
    }
  }
  .icon-wode {
    color: #fff;
    font-size: 25px;
  }
}
/deep/ .van-tabs__nav {
  background: #eee;
}
/deep/.van-tab {
  flex-basis: 14% !important;
}
/deep/.van-tab:nth-last-child(2) {
  // background: red;
  position: absolute;
  right: 0;
  top: 0;
}
/deep/.van-tabs__nav {
  position: static;
  line-height: 44px;
}
/deep/.van-tab__text--ellipsis {
  height: 44px;
}
/deep/.van-tabs__line {
  position: static;
}
/deep/.van-tabs__wrap {
  padding-right: 30px;
  background-color: #eee;
}
/deep/.van-tab__text {
  padding-right: 10px;
}
/deep/.van-tab--active {
  border-bottom: 3px solid red;
}
/deep/.van-tab__text {
  padding-right: 0;
}
</style>