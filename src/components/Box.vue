<template>
  <div>
      <div :style="'background:'+ cl" class="box"></div>
  </div>
</template>

<script>
export default {
   props:['cl'],
}
</script>

<style scoped lang="less">
 .box{
     width: 50px;
     height: 50px;
     background-color: brown;
 }
</style>