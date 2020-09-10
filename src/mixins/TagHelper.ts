import Vue from 'vue';
import Component from 'vue-class-component';

// Define a super class component
@Component
export default class TagHelper extends Vue {

  createTag() {
    const name: string | null = window.prompt('请输入标签名');
    if (name === null || name.trim() === '') {
      return window.alert('输入不能为空');
    } else {

      this.$store.commit('createTag', name);

    }
  }
}