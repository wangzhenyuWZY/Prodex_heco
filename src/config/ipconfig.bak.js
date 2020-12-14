/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TGky6zKfhrisXh92emTvPAbkenhXHTU8m6',
    BFactory:'TQauXF9CH2Kuemrt6vsr99YT43N2YEDfaK',
    MasterChef:'TJkCa4EKXkdfc5QaX56z6smZ1AnmVF4ZzZ',
    FactoryManager:'TQpCHS4BtCwwnYw9dfZHnk5ZMnBBXHd64v'
  }
}else{
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory:'TEG4wm38LS96HSWybWDGXLsZ27BY8G7Xes',
    MasterChef:'TEDKHvxU89jA61e7BhmXptUaaBkHZhziC8',
    FactoryManager:'TJYT1XbS9bHTTFbhSDpgr3Kmk41csKxrRa'
  }
}
export default ipConfig

