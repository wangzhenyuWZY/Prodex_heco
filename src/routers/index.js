import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', name:'Exchange', component: ()=> import('../pages/exchange/exchange') },
    { path: '/pool', name:'Pool', component: ()=> import('../pages/pool/pool') },
    { path: '/create1', name:'Create', component: ()=> import('../pages/pool/create') },
    { path: '/addLiquidity', name:'AddLiquidity', component: ()=> import('../pages/pool/addLiquidity') },
    { path: '/tradeMining', name:'TradeMining', component: ()=> import('../pages/mining/tradeMining') },
    { path: '/lpMining', name:'LpMining', component: ()=> import('../pages/mining/lpMining') },
    { path: '/selectPool', name:'SelectPool', component: ()=> import('../pages/mining/selectPool') },
    { path: '/prodex', name:'Prodex', component: ()=> import('../pages/prodex/prodex') },
    { path: '/prodexInfo', name:'ProdexInfo', component: ()=> import('../pages/prodex/prodexInfo') },
    { path: '/create', name:'Create1', component: ()=> import('../pages/create/create1') },
    { path: '/createConfirm', name:'Create2', component: ()=> import('../pages/create/create2') },
    { path: '/createSuc', name:'Create3', component: ()=> import('../pages/create/create3') },
    { path: '/removeLiquidity', name:'RemoveLiquidity', component: ()=> import('../pages/pool/removeLiquidity') }
  ]
})
