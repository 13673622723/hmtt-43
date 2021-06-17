<template>
  <div>
    {{userName}}
    <button>我是父组件的按钮</button>
    <Btn :data='dw'  @myclick="clickFarzer"/>
    <Box :cl='getcolor'/>
    <Footer @getName='getUserName'/>
  </div>
</template>

<script>
import Btn from "@/components/Btn";
import Box from "@/components/Box";
import Footer from '@/components/Footer';
export default {
  data() {
    return {
      dw: [
        { name: "小狗", age: 5 },
        { name: "小猪", age: 2 }
      ],
      getcolor:'',
      userName:''
    };
  },
   components:{
       Btn,
       Box,
       Footer
    },
    methods:{
      clickFarzer(v){
        // alert('我是父组件的事件函数')
        // console.log(v);
        this.getcolor=v
        console.log(this.getcolor);
        
      },
      getUserName(name){
        console.log(name);
        this.userName=name;
      }
    }
};
</script>

<style>
</style>