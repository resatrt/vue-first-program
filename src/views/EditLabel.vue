<template>
  <Layout>
    <div class="navBar">
      <Icons class="leftIcon" name="left"/>
      <span class="title"> 编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');//用replace是为了防止不能回退，push()是回退后又重定向到404
    }
  }
}
</script>

<style lang='scss' scoped>

.navBar {
  text-align: center;
  padding: 12px 16px;
  background: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {

    width: 24px;
    height: 24px;
  }

  > .title {

  }

  .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;

}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}

</style>