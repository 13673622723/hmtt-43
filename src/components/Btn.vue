<template>
  <div>
    <input type="text" v-model="bgcolor">
    <button @click="getList" >我是子组件的按钮</button>
    <!-- {{data}} -->
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      list: [
        { name: "小明", age: 20 },
        { name: "小红", age: 10 }
      ],
      bgcolor:''
    };
  },
  methods:{
      getList(){
        //   console.log(this.bgcolor);
          this.$emit('myclick',this.bgcolor)  
      }
  },
//   mounted(){
//       this.$emit('myclick')
//   }
};
</script>

<style>
</style>