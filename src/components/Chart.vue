<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts;

  mounted() {
    if (this.options === undefined) {
      return console.log('数据为空');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }
//因为mounted只会在挂载的时候执行一次，后面的数据更新之后就不会再有动作了
  //用watch监听每一次option更新
  @Watch('options')
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  width: 350px;
  height: 350px;
  margin: 0 auto;
}
</style>