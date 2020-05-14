<template>
  <div class="outermost">
    <!-- 返回上一页的按钮 -->
    <div class="back">
      <router-link to="/">
        <span class="iconfont iconicon-test"></span>
      </router-link>
    </div>

    <!-- log -->
    <div class="log">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 登录的form表单 -->
    <van-form @submit="onSubmit">
      <!-- 用户输入框 -->
      <van-field
        v-model="form.username"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />

      <!-- 密码输入框 -->
      <van-field
        v-model="form.password"
        type="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <!-- 点击注册跳转注册页 -->
    <router-link to="/register">
      <div style="margin: 16px;">
        <van-button round block native-type="submit">注册</van-button>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户名和密码的值
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //   console.log(this.form);
      //   点击登录的时候获取数据
      this.$axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        console.log(res);
        const { message, data } = res.data;
        this.$toast.success(message);
        localStorage.setItem("userInfo", JSON.stringify(data));
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style scoped lang="less">
.outermost {
  padding: 20 / 375 * 100vw;
  .back {
    width: 27 / 375 * 100vw;
    height: 27 / 375 * 100vw;
    .iconicon-test {
      font-size: 27px;
    }
  }
  .log {
    display: flex;
    justify-content: center;
    .iconnew {
      color: #cc3300;
      font-size: 126px;
      margin: 20 / 375 * 100vw 0;
    }
  }
  .van-cell {
    margin-bottom: 20 / 375 * 100vw;
  }
  .van-button--info {
    background: #cc3300;
    border: none;
    outline: none;
    margin-top: 30 / 375 * 100vw;
    margin-bottom: 30 / 375 * 100vw;
  }
}
</style>