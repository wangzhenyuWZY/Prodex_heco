 import {
  CONNECT_WALLET
 }  from './action-types';



 const mutations  = {
   [CONNECT_WALLET] (state,payload) {
          payload.balance = window.tronWeb.fromSun(payload.balance);
          state.walletAddres = payload;
          state.connectFlag = true;
  },
  changeTolerance(state,num){
    state.tolerance = num
  }
   
}


export default mutations