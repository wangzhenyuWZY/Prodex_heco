import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'
import Element from 'element-ui';
import FastClick from 'fastclick'
import router from './routers'
import {IsPc} from './utils/index';
import initTronWeb from './utils/tronwebFn'
Vue.prototype.$initTronWeb = initTronWeb
Vue.use(Element);
Vue.config.productionTip = false
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
  render: h => h(App),
}).$mount('#app')
