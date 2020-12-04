import * as types from './action-types';


 const action = {
   async connectWallett ({commit},flag) {
       if (flag === false) return;
        try {
                let res= await window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58);
                commit(types.CONNECT_WALLET,res);
        } catch (error) {
            console.log(error)
        }
   }
}
export default action