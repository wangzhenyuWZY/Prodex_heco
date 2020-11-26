const initTronWeb = () => {//初始化tronweb
    return new Promise(function (resolve, reject) {
        let tries = 0;
        const loadFinish = function () {
            resolve(window.tronWeb);
        };
        let timer = setInterval(function () {
            if (window.tronWeb) {
                clearInterval(timer);
                if (!window.tronWeb.defaultAddress.base58) {
                    window.tronWeb.on('addressChanged', function () {
                        return loadFinish();
                    });
                } else {
                    return loadFinish();
                }
            }
            if (tries > 10) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}
const bPoolAllowance = (coinAddress) => {//BPool查询授权
    return new Promise(function (resolve, reject) {
        try {
            var functionSelector = 'allowance(address,address)';
            var parameter = [
                {type: 'address', value: window.tronWeb.defaultAddress.base58},
                {type: 'address', value: coinAddress}
            ]
            window.tronWeb.transactionBuilder.triggerConstantContract(coinAddress,functionSelector,{}, parameter).then((transaction)=>{
                resolve(transaction)
            })
        } catch (error) {
            console.log(error);
            reject()
        }
    })
}
const allowance = (coinAddress) => {//查询授权
    return new Promise(function (resolve, reject) {
        try {
            window.tronWeb.contract().at(coinAddress).then((Contract)=>{
                Contract["allowance"](window.tronWeb.defaultAddress.base58, coinAddress).call().then((res)=>{
                    resolve(res)
                })
            })
        } catch (error) {
            console.log(error);
            reject()
        }
    })
}
// const bPoolApproved = (coinAddress,contractAddress) => {//BPool查询授权
//     return new Promise(function (resolve, reject) {
//         try {
//             var functionSelector = 'approve(address,uint256)';
//             var parameter = [
//                 {type: 'address', value: contractAddress},
//                 {type: 'address', value: '10000000000000000'}
//             ]
//             window.tronWeb.transactionBuilder.triggerConstantContract(coinAddress,functionSelector,{}, parameter).then((transaction)=>{
//                 resolve(transaction)
//             })
//         } catch (error) {
//             console.log(error);
//             reject()
//         }
//     })
// }
const approved = (coinAddress,contractAddress) => {//授权
    return new Promise(function (resolve, reject) {
        try {
            window.tronWeb.contract().at(coinAddress).then((Contract)=>{
                Contract["approve"](contractAddress,'10000000000000000').send({shouldPollResponse:true}).then((res)=>{
                    if(res){
                        alert('授权成功')
                        resolve(1);
                    }
                })
            })
        } catch (error) {
            reject(0)
            console.log(error);
        }
    })
}
const decimals = (address) => {//查询精度
    return new Promise(function (resolve, reject) {
        try {
            window.tronWeb.contract().at(address).then((Contract)=>{
                Contract["decimals"]().call().then((res)=>{
                    if(res){
                        resolve(res);
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    })
}
const getConfirmedTransaction = (id) => {//轮询获取交易信息
    return new Promise(function (resolve, reject) {
        try {
            var interval = window.setInterval(()=>{
                window.tronWeb.trx.getTransactionInfo(id).then((res)=>{
                    if(res.contractResult){
                        clearInterval(interval)
                        console.log(res)
                        resolve(res);
                    }
                })
            },2000)
        } catch (error) {
            console.log(error);
        }
    })
}

export {approved,decimals,getConfirmedTransaction,allowance,bPoolAllowance}
export default initTronWeb;