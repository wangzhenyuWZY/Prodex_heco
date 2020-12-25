import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './routers'
import { IsPc, requierImg } from './utils/index'
import initTronWeb from './utils/tronwebFn'
// import layer from 'vue-layer'
// import 'vue-layer/lib/vue-layer.css';
import store from './store/index'
import Popup from './popup/popup'
import i18n from './lang'
import './plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
// Vue.prototype.$layer = layer(Vue);
Vue.prototype.$initTronWeb = initTronWeb
Vue.prototype.$requierImg = requierImg
Vue.prototype.$popup = Popup.install
Vue.config.productionTip = false
// 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
FastClick.prototype.focus = function(targetElement) {
  targetElement.focus()
}
if (!IsPc()) {
  require('./utils/dpi.js')
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
