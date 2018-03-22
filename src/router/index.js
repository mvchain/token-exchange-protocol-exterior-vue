import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/Layout';
const _import = require('./_import_production');

Vue.use(Router);

export default new Router({
  routes: [
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
        },
        {
          path: 'info',
          component: _import('info/index'),
          name: '项目详情'
        },
        {
          path: 'login',
          component: _import('login/index'),
          name: '登录'
        },
        {
          path: 'safety',
          component: _import('safety/index'),
          redirect: '/safety/fundsTable',
          children: [
            {
              path: 'fundsTable',
              component: _import('fundsTable/index'),
              name: '表格'
            },
            {
              path: 'recharge',
              component: _import('recharge/index'),
              name: '充值'
            },
            {
              path: 'withdraw',
              component: _import('withdraw/index'),
              name: '提现'
            },
            {
              path: 'ctHistory',
              component: _import('ctHistory/index'),
              name: '充提历史'
            }
          ]
        }
      ]
    }
  ]
});
