import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = ()=>import('../pages/home')
const Exchange = ()=>import('../pages/Exchange/Exchange.vue')
const Pool = ()=>import('../pages/Pool/Pool.vue')
const Foxdex = ()=>import('../pages/Foxdex/Foxdex.vue')
const Wtrx = ()=>import('../pages/Wtrx/Wtrx.vue')
const Stake = ()=>import('../pages/Stake/Stake.vue')
const Stakes = ()=>import('../pages/Stake/Selected.vue')
const contexnt =()=>import('../pages/Pool/contexnt')
const removeLiquidity =()=>import('../pages/Pool/removeLiquidity')
const liquidity =()=>import('../pages/Pool/liquidity')
const addfrombox =()=>import('../pages/Pool/addfrombox')
const Connectbox =()=>import('../pages/Pool/Connectbox')
const selctoken =()=>import('../pages/Pool/selctToken')
const recevive =()=>import('../pages/Pool/recevive')
const willRecevive =()=>import('../pages/Pool/willRecevive')
const createpair =()=>import('../pages/Pool/createpair')
export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home,},
    { path: '/exchange', component: Exchange,},
    { path: '/pool', component: Pool,
      children:[
        {
          path:'/',
          name:'liquidity',
          component:liquidity
        },
      
        {
          path:'addpoll',
          name:'addfrombox',
          component:addfrombox
        },
        {
          path:'connectpool',
          name:'Connectbox',
          component:Connectbox
        },
        {
          path:'selctoken',
          name:'selctoken',
          component:selctoken
        },
        {
          path:'removeLiquidity',
          name:'removeLiquidity',
          component:removeLiquidity
        },
        {
          path:'recevive',
          name:'recevive',
          component:recevive
        },
        {
          path:'willRecevive',
          name:'willRecevive',
          component:willRecevive
        },
        {
          path:'pairs',
          name:'createpair',
          component:createpair
        }
        
       
       
      ]
  },
    { path: '/foxdex', component: Foxdex},
    { path: '/wtrx', component: Wtrx}, 
    { path: '/stake', component: Stake},
    {
      path:"/test",
      component:Stakes
    }
  ]
})
