const initTronWeb = () => {
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
const approved = (coinAddress,contractAddress) => {
    return new Promise(function (resolve, reject) {
        try {
            window.tronWeb.contract().at(coinAddress).then((Contract)=>{
                Contract["approve"](contractAddress,0xe8d4a51000).send({shouldPollResponse:true}).then((res)=>{
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
const decimals = (address) => {
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
export {approved,decimals}
export default initTronWeb;