<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import echarts, {EChartOption} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  mounted(){
   if(this.options===undefined){
     return console.log('数据为空')
   }
   const chart=  echarts.init(this.$refs.wrapper as HTMLDivElement)
    chart.setOption(this.options)
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  width: 350px;
  height: 350px ;
  margin: 0 auto  ;
}
</style>