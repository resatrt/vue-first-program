import Vue from 'vue';
import Component from 'vue-class-component';

// Define a super class component
@Component
export default class TagHelper extends Vue {

  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      return window.alert('输入不能为空');
    }
    this.$store.commit('createTag', name);

  }
}