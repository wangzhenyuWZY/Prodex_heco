import * as types from './action-types';


 const action = {
   async connectWallett ({commit},flag) {
       if (flag === false) return;
       console.log(flag);
        try {
            let res= await window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58);
            console.log(res);
            commit(types.CONNECT_WALLET,res);
        } catch (error) {
            console.log(error)
        }
   }
}
export default action