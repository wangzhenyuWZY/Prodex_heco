import api from './index'
// axios
import request from './request'

// 获取首页数据
export function getChainInfo(data) {
  return request(
    api.getChainInfo,
    'get',
    data
  )
}

//获取图表数据
export function getSnapshot(data) {
  return request(
    api.getSnapshot,
    'get',
    data
  )
}

//获取区块列表
export function getBlockList(data) {
  return request(
    api.blockList+data.pageNum,
    'get',
    data
  )
}

//获取交易列表
export function getTransList(data) {
  return request(
    api.transactionList+data.pageNum,
    'get',
    data
  )
}

//获取地址信息
export function getAddressInfo(data) {
  return request(
    api.addressInfo+data.address,
    'get',
    data
  )
}

//通过地址获取交易列表
export function listByAddress(data) {
  return request(
    api.listByAddress+data.pageNum,
    'get',
    data
  )
}

//通过hash获取交易详情
export function listByHash(data) {
  return request(
    api.listByHash+data.hash,
    'get',
    data
  )
}

//通过hash获取区块详情
export function blockGetByHash(data) {
  return request(
    api.blockGetByHash+data.hash,
    'get',
    data
  )
}