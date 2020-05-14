<template>
  <div>
    <Header title="编辑资料" />
    <div class="userImgs">
      <img :src="$axios.defaults.baseURL+ userInfo.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div>
      <div>
        <ButtonList label="昵称" :value="userInfo.nickname" @click.native="showname = true" />
        <van-dialog v-model="showname" title="修改昵称" show-cancel-button @confirm="modifyNickName">
          <van-field v-model="nickname" placeholder="请输入昵称" />
        </van-dialog>
      </div>
      <div>
        <ButtonList label="密码" value="******" @click.native="showpassword = true" />
        <van-dialog
          v-model="showpassword"
          title="修改密码"
          show-cancel-button
          @confirm="modifyNickName"
        >
          <van-field v-model="password" placeholder="请输入密码" />
        </van-dialog>
      </div>
      <div>
        <ButtonList
          label="性别"
          :value="['女','男'][userInfo.gender]"
          @click.native="showgender = true"
        />
        <van-action-sheet
          v-model="showgender"
          close-on-click-action
          :actions="actions"
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ButtonList from "@/components/ButtonList";
export default {
  data() {
    return {
      //   用户详情
      userInfo: {},
      jsonUser: {},
      show: false,
      showname: false,
      showpassword: false,
      showgender: false,
      // 单独记录弹窗输入框昵称
      nickname: "",
      // 单独记录弹窗输入框密码
      password: "",
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ]
    };
  },
  components: {
    Header,
    ButtonList
  },
  mounted() {
    const jsonUser = JSON.parse(localStorage.getItem("userInfo"));
    this.jsonUser = jsonUser;
    this.$axios({
      url: "/user/" + jsonUser.user.id,
      headers: {
        Authorization: jsonUser.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
      this.password = data.password;
    });
  },
  methods: {
    // 图片上传的方法，file是对文件对象（认为它是不可读的）
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      // 创建一个表单对象，上传图片资源必须是表单类型,不能用json
      const formData = new FormData();
      // 通过原有的方法append给表单添加元素
      // 第一个字符串的file表示接口接收的属性，第二个 file.file是文件对象
      formData.append("file", file.file);
      this.$axios({
        url: "/upload",
        // post请求
        method: "POST",
        headers: {
          Authorization: this.jsonUser.token
        },
        data: formData
      }).then(res => {
        // console.log(res);
        const { url } = res.data.data;
        // console.log(url);
        this.userInfo.head_img = url;
        this.handEdit({
          head_img: url
        });
      });
    },
    // 编辑成功请求
    handEdit(data) {
      return this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: this.jsonUser.token
        },
        data
      }).then(res => {
        // console.log(data);
        this.$toast.success("修改成功");
      });
    },
    modifyNickName() {
      // 上面的编辑成功的请求，return出去，调用的时候是有返回值的
      // 返回的值也就是axios请求，请求后面可以跟上很多个.then，如果请求成功的话，会往下执行.then里面的，如果请求失败是不会执行的
      const request = this.handEdit({
        nickname: this.nickname,
        password: this.password
      });
      console.log(request);
      // 判断：如果请求成功了，才会执行赋值，如果没成功，就不会执行请求.then里的代码，也就是不会赋值，也不会编辑成功
      request.then(() => {
        this.userInfo.nickname = this.nickname;
        this.userInfo.password = this.password;
      });
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item);
      this.handEdit({
        gender: item.value
      });
      this.userInfo.gender = item.value;
    }
  }
};
</script>

<style scoped lang="less">
.userImgs {
  height: 150 / 375 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100 / 375 * 100vw;
    height: 100 / 375 * 100vw;
    border-radius: 50%;
  }
  /deep/ .van-uploader__wrapper {
    position: absolute;
    width: 100 / 375 * 100vw;
    height: 100 / 375 * 100vw;
    left: -70px;
    top: -40px;
    opacity: 0;
  }
}
</style>