import store from '../store/index'
import {BPool} from '../api/deployments'
/**
 * 查询授权
 * @param {合约} Contract 
 * @param {abi} ABI
 */
const Allowance = (Contract,Spender) => {
  return new Promise(function(resolve, reject) {
      const contract = new web3.eth.Contract(Contract.abi, Contract.address)
      let defaultAccout = store.state.app.defaultAccout
      contract.methods.allowance(defaultAccout,Spender).call().then((res)=>{
          resolve(res)
      })
  })
}
/**
 * 授权
 * @param {合约ABI} ABI 
 * @param {合约地址} ADDRESS 
 * @param {合约地址}
 */
const Approved = (ABI,ADDRESS,Spender) => {
  return new Promise(function(resolve, reject) {
    const contract = new web3.eth.Contract(ABI, ADDRESS)
    let defaultAccout = store.state.app.defaultAccout
    contract.methods.approve(Spender,'100000000000000000000000000').send({from:defaultAccout}).then((result)=>{
      resolve(result)
    })
  })
}
/**
 * 查询精度
 * @param {合约地址} address 
 * @param {abi} ABI
 */
const Decimals = (ABI,ADDRESS) => {
  return new Promise(function(resolve, reject) {
      const contract = new web3.eth.Contract(ABI, ADDRESS)
      contract.methods.decimals().call().then((res)=>{
          console.log(res)
          resolve(res)
      })
  })
}
const getConfirmedTransaction = (id) => { // 轮询获取交易信息
  return new Promise(function(resolve, reject) {
    try {
      var interval = window.setInterval(() => {
        window.tronWeb.trx.getTransactionInfo(id).then((res) => {
          if (res.contractResult) {
            clearInterval(interval)
            console.log(res)
            resolve(res)
          }
        })
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  })
}

const getBalanceInPool = (pair, coin) => { // 获取单个币种在Pool中的余额
  return new Promise(function(resolve, reject) {
    const contract = new web3.eth.Contract(BPool.abi, pair.address)
    contract.methods.getBalance(coin.address).call().then((result)=>{
      const tokenBalanceInPool = result / Math.pow(10, coin.decimals)
      resolve(tokenBalanceInPool)
    })
  })
}
const getMyBalanceInPool = (pair) => { // 获取Pool中我的LPtoken余额
  return new Promise(function(resolve, reject) {
    const contract = new web3.eth.Contract(BPool.abi, pair.address)
    let defaultAccout = store.state.app.defaultAccout
    contract.methods.balanceOf(defaultAccout).call().then((result)=>{
      resolve(result)
    })
  })
}
const getLpBalanceInPool = (pair) => { // 获取LPtoken总额
  return new Promise(function(resolve, reject) {
    const contract = new web3.eth.Contract(BPool.abi, pair.address)
    contract.methods.totalSupply().call().then((result)=>{
      resolve(result)
    })
  })
}
const getTokenDenormalizedWeight = (coinAddress, contractAddress) => { // 获取token在交易对中的权重
  return new Promise(function(resolve, reject) {
    const contract = new web3.eth.Contract(BPool.abi, contractAddress)
    contract.methods.getDenorm(coinAddress).call().then((result)=>{
      resolve(result)
    })
  })
}
export {
  Approved,
  Decimals,
  getConfirmedTransaction,
  Allowance,
  getBalanceInPool,
  getMyBalanceInPool,
  getLpBalanceInPool,
  getTokenDenormalizedWeight
}

