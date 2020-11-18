import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Exchange = ()=>import('./pages/Exchange.vue')
const Pool = ()=>import('./pages/Pool.vue')
const Foxdex = ()=>import('./pages/Foxdex.vue')
const Wtrx = ()=>import('./pages/Wtrx.vue')

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Exchange,},
    { path: '/pool', component: Pool },
    { path: '/foxdex', component: Foxdex},
    { path: '/wtrx', component: Wtrx}, 
  ]
})
