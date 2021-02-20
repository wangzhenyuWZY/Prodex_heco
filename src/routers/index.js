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
    { path: '/BlockDetail', component: ()=> import('../pages/home/blockDetail') },
    { path: '/BlockHistory', component: ()=> import('../pages/home/blockHistory') },
    { path: '/TransferHistory', component: ()=> import('../pages/home/transferHistory') },
    { path: '/AccountDetail', component: ()=> import('../pages/home/accountDetail') },
    { path: '/TransferDetail', component: ()=> import('../pages/home/transferDetail') },
    { path: '/Download', component: ()=> import('../pages/home/download') },
  ]
})
