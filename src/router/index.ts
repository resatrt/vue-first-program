import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/Money'
    //重定向到money组件
  },
  {
    path: '/money',
    component: Money
  }, {
    path: '/labels',
    component: Labels
  },

  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/labels/edit/:id', //:id的意思是我后面还会有字符串，但是我不知道是多少，用这个占位
    component: EditLabel

  },
  {
    path: '*',
    component: NotFound
  }

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
