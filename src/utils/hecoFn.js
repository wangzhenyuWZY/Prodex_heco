//构建web3对象
import Web3 from 'web3'
const initWeb3 = () => {
    return new Promise(function(resolve, reject) {
        const web3 = new Web3('https://http-testnet.hecochain.com')
        resolve(web3)
    })
}

export default initWeb3