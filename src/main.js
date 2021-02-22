import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './routers'
import './plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import i18n from './lang'
Vue.config.productionTip = false
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
FastClick.prototype.focus = function(targetElement) {
  targetElement.focus()
}
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
