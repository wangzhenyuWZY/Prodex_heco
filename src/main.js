import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'
import Element from 'element-ui';
import FastClick from 'fastclick'
import router from './routers'
import {IsPc} from './utils/index';
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import store from './store/index';
Vue.prototype.$layer = layer(Vue);
Vue.use(Element);
Vue.config.productionTip = false
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus();
};
if (!IsPc()) {
  require('./utils/dpi.js');
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
