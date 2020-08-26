<template>
  <button class="button" @click="$emit('click',$event)">
<!--  @click="$emit('click',$event)"的意思是当button被点击时，触发引用组件的事件  -->
    <slot/>
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang='scss' scoped>
button {
  background: #767676;
  color: white;
  padding: 9px 15px;
  border: none;
  border-radius: 4px;
  //&-wrapper表示createTag的父元素
  &-wrapper {
    text-align: center;
    margin-top: 44px;
  }
}
</style>