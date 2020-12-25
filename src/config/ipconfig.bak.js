/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TGky6zKfhrisXh92emTvPAbkenhXHTU8m6',
    BFactory: 'TYFMTMFQKnm23o5RxhYLMN94NSnb3cpgQx',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TMAJmEkLG8G4mw3LZ7xrCjYRmNksdBSi9B',
    RewardToken: 'TSgdjJHEr18FAF6Wyk8hFmgoQwCyqe5gYU'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TXU7bsdPKp8KdgPDTtf2VdAvZmGjFs5Wt8',
    MasterChef: 'TPfeyfwWHeVyFmDPbHSfKw7cbXXABL5vzP',
    FactoryManager: 'TF8f1TFd72WWysLchSHSR2L1DTc5gAXuXZ',
    RewardToken: 'TUMZX3VRgN651CY4f4CNsi5SvTkTSqVuu5'
  }
}
export default ipConfig

