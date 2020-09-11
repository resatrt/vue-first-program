import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// import {createLocalVue} from '@vue/test-utils';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//帮助某些显示不出导航栏的浏览器直接滚动到最下面
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 100);
  }, 0);

  const phoneWidth = document.documentElement.clientWidth

  const phone = document.getElementById('app')
  if(!phone){
    return
  }
  phone.style.width=`${phoneWidth}px`
  phone.style.height=`${phoneWidth*1.2}px`
};


// if (document.documentElement.clientWidth > 500) {
//   window.alert('请使用手机扫描屏幕上的二维码以便于更好的使用体验');
//   const img = document.createElement('img');
//   img.src = '../qrcode.png';
//   img.style.position = 'fixed';
//   img.style.left = '50%';
//   img.style.top = '50%';
//   img.style.transform = 'translate(-50%,-50%)';
//   img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
//   document.body.appendChild(img);
// }