import  {fet} from './constants.js'

const api = {}
api.get24HourTradingVolume = params => {
  return fet('api/trade/getTradingVolume',params,'get')
} 
api.getLpComputeApy = params => {
  return fet('v1/fox/flowcell/getLpComputeApy',params,'get')
}
export function getTokenList(params) {
  return fet('api/token/getToken',params,'get')
}
export function getPairList(params) {
  return fet('api/token/getPair',params,'get')
}

export {api}