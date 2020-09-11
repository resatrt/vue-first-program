<template>
  <div>
    <label class="formItem">

      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type==='date'">
        <input :type="type"
                :max="beautyString(new Date().toISOString())"
                min="2010-01-01"
               :value="beautyString(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
      <template v-else>
        <input :type="'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
<!--//也可以使用更精确的<input type="datetime-local">  这个支持到时分，不支持秒（如果秒还要选择真的是傻逼)-->

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
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder!: string;
  @Prop() type?: string;
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
  beautyString(iosString: string){
   return   dayjs(iosString).format('YYYY-MM-DD')
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
    height: 26px;
    background: transparent;
    padding-right: 16px;
    border: none;
  }
}

</style>