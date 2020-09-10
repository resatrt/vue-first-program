<template>
  <layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icons name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
      components: {Button}
    }
)
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  //   createTag() {
  //     const name = window.prompt('请输入标签名');
  //     if (!name) {
  //       return window.alert('输入不能为空');
  //     }
  //     this.$store.commit('createTag', name);
  //
  //   }
  //
}

</script>

<style lang="scss" scoped>

.tags {
  background: white;
  font-size: 16px;
  padding-left: 15px;
  max-height: 90%;
  overflow: scroll;

  > .tag {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0px -0.5px 0px #BCBBC1;

    > svg {
      margin-right: 15px;
      width: 18px;
      height: 18px;
      color: #666;
    }
  }
}

.createTag {
  background: #767676;
  color: white;
  padding: 9px 15px;
  border: none;
  border-radius: 4px;
  //&-wrapper表示createTag的父元素
  &-wrapper {
    text-align: center;
    margin: 15px auto;


  }
}
</style>