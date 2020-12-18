 import {
  CONNECT_WALLET,
  SET_TOKEN_DATA,
  SET_PAIR_DATA
 }  from './action-types';



 const mutations  = {
   [CONNECT_WALLET] (state,payload) {
          payload.balance = window.tronWeb.fromSun(payload.balance);
          state.walletAddres = payload;
          state.connectFlag = true;
  },
  changeTolerance(state,num){
    state.tolerance = num
  },
  [SET_TOKEN_DATA] (state,payload) {
    state.tokenData = payload;
  },
  [SET_PAIR_DATA] (state,payload) {
    state.pairData = payload;
  }
   
}


export default mutations