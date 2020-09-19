<template>
  <Layout>
    <div class="navBar">
      <Icons class="leftIcon" name="left" @click="goBack"/>
      <!-- @click="goBack"也可以用@click.native='goBack'， Icons.vue里就不需要透传了     -->
      <span class="title"> 编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name"
                @update:value="update"
                field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';


@Component({
  components: {Button, FormItem},

})
export default class EditLabel extends Vue {
  //从computed里拿tag的话在class里是没办法用的，只能在template里用
  //但是原生的get是可以的
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    //this.$route.params.id 是获取当前跳转页面的ID编号
    const id = this.$route.params.id;
    //这个ID在里面是拿不到的，而且也不需要在里面，只需要传给里面就好了
    this.$store.commit('fetchTags');//这句解决了改标签页面刷新404的bug
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      // console.log('没tag');
      this.$router.replace('/404');
      //用replace是为了防止不能回退，push()是回退后又重定向到404
    } else {
      // console.log('有tag');
    }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag', {
        id: this.currentTag.id, name: name
      });
      // store.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }

  goBack() {
    this.$router.back();//这个有bug，稍后解决
  }
}
</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  padding: 12px 16px;
  background: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {

    width: 24px;
    height: 24px;
  }

  > .title {
    font-weight: bold;
    font-size: 22px;
  }

  .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
  line-height: 15px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}

::v-deep .formItem {
  line-height: 42px;
  margin: 5px auto;

  > span {
    font-size: 18px;
    font-weight: bold;
    margin-left: -16px;
    padding: 0 0 0 14px;

  }

  > input {
    font-size: 18px;
  }
}
</style>