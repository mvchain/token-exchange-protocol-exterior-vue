// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import * as filters from './filters'; // 全局filter
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './permission'; // 权限
Vue.config.productionTip = false;
Vue.use(ElementUI);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
