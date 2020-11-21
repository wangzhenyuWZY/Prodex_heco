import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = ()=>import('../pages/home')
const Exchange = ()=>import('../pages/Exchange/Exchange.vue')
const Pool = ()=>import('../pages/Pool/Pool.vue')
const Foxdex = ()=>import('../pages/Foxdex/Foxdex.vue')
const Wtrx = ()=>import('../pages/Wtrx/Wtrx.vue')
const Stake = ()=>import('../pages/Stake/Stake.vue')

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home,},
    { path: '/exchange', component: Exchange,},
    { path: '/pool', component: Pool },
    { path: '/foxdex', component: Foxdex},
    { path: '/wtrx', component: Wtrx}, 
    { path: '/stake', component: Stake},
  ]
})
