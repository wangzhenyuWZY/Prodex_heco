import  {fet} from './constants.js'

const api = {}
api.get24HourTradingVolume = params => {
  return fet('v1/fox/blockTransaction/get24HourTradingVolume',params,'get')
} 
api.getLpComputeApy = params => {
  return fet('/v1/fox/flowcell/getLpComputeApy',params,'get')
}

export {api}