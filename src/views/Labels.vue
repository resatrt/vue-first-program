<template>
  <layout>
    <div class="tags">
      <router-link class="tag"  v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name}}</span>
        <Icons name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </layout>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

tagListModel.fetch()

@Component
export default class Labels extends Vue {
  tags = tagListModel.data  //我只读取数据

  createTag() {
    const name = window.prompt('请输入标签名')
    if (name) {
      const message = tagListModel.create(name)
      if(message==='duplicated'){
        window.alert('标签名重复')
      }

    }
  }

}

</script>

<style lang="scss" scoped>

.tags {
  background: white;
  font-size: 16px;
  padding-left: 15px;

  >.tag {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0px -0.5px 0px #BCBBC1;

    > svg {
      margin-right: 15px;
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
    margin-top: 44px;
  }
}
</style>