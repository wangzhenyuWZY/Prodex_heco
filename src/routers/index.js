import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '../pages/home'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    // { path: '/BlockDetail', component: ()=> import('../pages/home/blockDetail') }
  ]
})
