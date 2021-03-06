//构建web3对象
import Web3 from 'web3'

const initWeb3 = () => {
    return new Promise(function(resolve, reject) {
        // const web3 = new Web3('https://http-testnet.hecochain.com')
        var web3Provider;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
                // 请求用户授权
                window.ethereum.enable();
            } catch (error) {
                // 用户不授权时
                console.error("User denied account access")
            }
        } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
            web3Provider = window.web3.currentProvider;
        } else {
            web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        let web3js = new Web3(web3Provider);//web3js就是你需要的web3实例
        
        web3js.eth.getAccounts(function (error, result) {
            console.log(result)//授权成功后result能正常获取到账号了
            web3js.eth.defaultAccount = result[0]
            resolve(web3js)
        });
    })
}

export default initWeb3