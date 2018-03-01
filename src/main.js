import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store'

Vue.use(ElementUI);
Vue.filter('fn',function (value) {
  return '￥' + value;
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
