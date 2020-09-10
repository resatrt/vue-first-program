<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)" class="tabs-item"
        :ref="item.value"
        @click="select(item)">
      {{ item.text }}
      <!--      :class="liClass(item)",不这样写就要这样写
          ：class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value===value}"                 -->
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string; value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) value!: string;
  @Prop(String) classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    };
  }

}
</script>

<style lang='scss' scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected {
      &::after {
        content: ''; /*如果直接用border-bottom的话会在显示的时候影响高度，有个变化*/
        position: absolute; /*用伪元素的绝对定位就没有影响*/
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;

      }

    }
  }

}
</style>