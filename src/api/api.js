import  {fet} from './constants.js'

const api = {}
api.get24HourTradingVolume = params => {
  return fet('v1/fox/blockTransaction/get24HourTradingVolume',params,'get')
}
export function getTokenList(params) {
  return fet('v1/fox/token/getTokenList',params,'get')
}
export function getPairList(params) {
  return fet('v1/fox/token/getPairList',params,'get')
}

export {api}