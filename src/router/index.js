import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/Layout';
const _import = require('./_import_production');

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/login', component: _import('login/index')},
    {path: '/404', component: _import('errorPage/404')},
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      name: '布局',
      children: [
        {path: 'home', component: _import('home/index'), name: '首页'},
        {
          path: 'proList',
          component: _import('proList/index'),
          name: '项目列表'
        },
        {
          path: 'help',
          component: _import('help/index'),
          name: '帮助与支持'
        }
      ]
    }
  ]
});
