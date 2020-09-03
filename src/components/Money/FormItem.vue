<template>
  <div>
    <label class="formItem">

      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
      <!--  :value="value"
                   @input="onValueChanged($event.target.value)"  的意思是我只是帮助这个值中转  -->

      <!--            方法二-->
      <!--            v-model 当 用这种方式时可以将这两者替换为 -->
      <!--                 :value="value"-->
      <!--    @input="value=$event.target.value"  这句的意思是将输入值传给value -->


    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder!: string;
  // 方法一
  //  <input> 添加     @input="onInput
  // onInput(event: KeyboardEvent) {
  //     const input = event.target as HTMLInputElement;
  //     this.value = input.value;
  // }

  // @Watch('value')
  // 不删除这个watch的话，他这一个值改变会重复两下 ，就导致更改标签时会触发两次
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {

  display: flex;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;

  > .name {
    padding-right: 16px;
  }

  > input {
    flex-grow: 1;
    height: 40px;
    background: transparent;
    padding-right: 16px;
    border: none;
  }
}

</style>