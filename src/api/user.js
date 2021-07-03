import api from './index'
// axios
import request from './request'

// 创建质押
export function createPledge(data) {
  return request(
    api.createPledge,
    'post',
    data
  )
}

//上传转账交易哈希
export function updateTxHash(data) {
  return request(
    api.updateTxHash,
    'post',
    data
  )
}

// 获取质押信息
export function pledgeDetail(data) {
  return request(
    api.pledgeDetail+data.id,
    'get',
    data
  )
}

//获取poolInfo信息
export function getPoolInfo(data) {
  return request(
    api.getPoolInfo,
    'get',
    data
  )
}

//获取单币挖矿信息
export function getSingle(data) {
  return request(
    api.getSingle,
    'get',
    data
  )
}

//获取币种列表
export function getCoinInfoList(data) {
  return request(
    api.getCoinInfoList,
    'get',
    data
  )
}

//上传
export function uploadPicture(data) {
  return request(
    api.uploadPicture,
    'post',
    data
  )
}

//获取token排行
export function getTokens(data) {
  return request(
    api.getTokens,
    'get',
    data
  )
}

//获取pair排行
export function getPairs(data) {
  return request(
    api.getPairs,
    'get',
    data
  )
}

//获取交易排行
export function getTransactions(data) {
  return request(
    api.getTransactions+data.pageNum,
    'get',
    data
  )
}