<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="back">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() value!: number;
  output = this.value.toString();

//因为传过来的value是number，而下面用output比较的都是字符串，所以要变成字符串
  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    //as HTMLButtonElement是强制指定类型
    const input = button.textContent!;//感叹号相当于as string
    if (this.output.length === 9) {
      alert('醒醒吧，你哪有这么多钱，该去搬砖了');
      this.clear();
      return;
    } //最多支持16位
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  back() {

    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    const  out=parseFloat(this.output)
    this.$emit('update:value', out);
    this.$emit('submit', out);
    this.output = '0';
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    font-size: 34px;
    font-family: Consolas, monospace，space,serif; /*monospace是编程字体*/
    padding: 6px 16px;
    text-align: right;
    /*height: 72px;*/
    @extend %innerBox-shadow;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      font-size: 18px;
      line-height: 22px;
      height: 64px;
      float: left; /*使用float必须要加clearfix*/
      border: none;
      background: transparent;

      &.ok {
        height: 64px*2;
        float: right;
      }

      &.zero {
        width: 25%*2;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4%*2);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4%*3);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4%*4);
      }

      &:nth-child(14) {
        background: darken($bg, 4%*5);
      }

      &:nth-child(12) {
        background: darken($bg, 4%*6);
      }
    }

  }
}

</style>