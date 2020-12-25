import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '../pages/home'
import Exchange from '../pages/Exchange/Exchange.vue'
import Pool from '../pages/Pool/Pool.vue'
import Foxdex from '../pages/Foxdex/Foxdex.vue'
import Wtrx from '../pages/Wtrx/Wtrx.vue'
import Stake from '../pages/Stake/Stake.vue'
import Stakes from '../pages/Stake/Selected.vue'
import removeLiquidity from '../pages/Pool/removeLiquidity'
import liquidity from '../pages/Pool/liquidity'
import addfrombox from '../pages/Pool/addfrombox'
import Connectbox from '../pages/Pool/Connectbox'
import selctoken from '../pages/Pool/selctToken'
import recevive from '../pages/Pool/recevive'
import willRecevive from '../pages/Pool/willRecevive'
import createpair from '../pages/Pool/createpair'
import importpool from '../pages/Pool/importpool'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    { path: '/exchange', component: Exchange },
    { path: '/pool', component: Pool,
      children: [
        {
          path: '/',
          name: 'liquidity',
          component: liquidity
        },

        {
          path: 'addpoll',
          name: 'addfrombox',
          component: addfrombox
        },
        {
          path: 'connectpool',
          name: 'Connectbox',
          component: Connectbox
        },
        {
          path: 'selctoken',
          name: 'selctoken',
          component: selctoken
        },
        {
          path: 'removeLiquidity',
          name: 'removeLiquidity',
          component: removeLiquidity
        },
        {
          path: 'recevive',
          name: 'recevive',
          component: recevive
        },
        {
          path: 'willRecevive',
          name: 'willRecevive',
          component: willRecevive
        },
        {
          path: 'pairs',
          name: 'createpair',
          component: createpair
        },
        {
          path: 'importpool',
          name: 'importpool',
          component: importpool
        }
      ]
    },
    { path: '/foxdex', component: Foxdex },
    { path: '/wtrx', component: Wtrx },
    { path: '/stake', component: Stake },
    {
      path: '/test',
      component: Stakes
    }
  ]
})
