import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import Element from 'element-ui';
import FastClick from 'fastclick'
import router from './routers'
import {IsPc} from './utils/index';
import initTronWeb from './utils/tronwebFn'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import store from './store/index';
import  Popup from './popup/popup';
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$initTronWeb =initTronWeb;
Vue.prototype.$popup = Popup.install;
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
// 监听PC浏览器波场钱包
// window.addEventListener('message', function (e) {
//   if (e.data.message && e.data.message.action == "tabReply") { // 初始化完成
//     console.log("tabReply event", e.data.message.data.data.address)
//     // store.dispatch('connectWallett',e.data.message.data.data.address);
//     if (e.data.message.data.data.node.chain == '_'){ // 主链
//         console.log("tronLink currently selects the main chain")
//     }else{ // 侧链
//         console.log("tronLink currently selects the side chain")
//     }
//     if (e.data.message && e.data.message.action == "setAccount") {
//             console.log("setAccount event", e.data.message)
//             console.log("current address:", e.data.message.data.address)

//         }
// }

// })
if (!IsPc()) {
  require('./utils/dpi.js');
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
