<template>
  <div>
    <input type="text" ref="ipt"  value="11111"/>
     <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
export default {

  methods:{
    //   setUserUame(){
    //       this.$emit('getName', this.userName)
    //   },
      handleClick(){
          console.log(this.$refs.ipt.value);
          
          this.$emit('getName', this.$refs.ipt.value)
      }
  }
};
</script>

<style>
</style>