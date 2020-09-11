<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
      {{ tag.name }}
        <!-- selected:selectedTags.indexOf(tag)>=0的意思是当选中的tag在selecedTags里，就添加selected               -->

      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component
export default class Tags extends mixins(TagHelper) {

  get tagList() {
    return this.$store.state.tagList;
  }

  get selectedTags() {
    return this.$store.state.selectedTags;
  }


  created() {
    this.$store.commit('fetchTags');
  }


  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    //index值为>=0时表示该标签存在selectedTags里，即标签已被点击过，为-1时表示该标签还未被点击过或已取消点击

    if (index >= 0) {
      this.selectedTags.splice(index, 1);//删除
    } else {
      this.selectedTags.push(tag);//添加
    }
    this.$emit('update:value', this.selectedTags);
  }

}
  // createTag() {
  //   const name = window.prompt('请输入标签名');
  //   if (!name) {
  //     return window.alert('输入不能为空');
  //   }
  //   this.$store.commit('createTag', name);
  // }

  //当dataSource不为空时，会触发一个update事件，将后面的更新后的数据传给:data-source.sync="tags" （前提是该数据有添加.sync修饰符）
  /*     比如这里   <Tags :data-source.sync="tags"/>*/

  //

</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  background: white;
  justify-content: space-between;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #D9D9D9;
      $h: 24px;
      background: $bg;
      padding: 0 16px;
      height: $h;
      line-height: $h; /*确定只有一行的时候才能使用height等于line-height*/
      margin-right: 12px;
      border-radius: ($h/2);
      margin-top: 4px;

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>