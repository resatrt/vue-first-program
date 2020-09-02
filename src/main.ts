import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// import {createLocalVue} from '@vue/test-utils';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

//用window做全局变量的问题
//1、全局变量太多
//2、严重依赖window，比如nodeJS里没有window

//record store
window.recordList=recordListModel.fetch()
window.createRecord=(record: RecordItem)=>{
  recordListModel.create(record)
}

//tag store
window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};
window.findTag=(id: string)=>{
  return  window.tagList.filter(t => t.id === id)[0];
}
window.removeTag=(id: string)=>{
  return tagListModel.remove(id);

}
window.updateTag=(id: string,name: string)=>{
  return  tagListModel.update(id, name);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
