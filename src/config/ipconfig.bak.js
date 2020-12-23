/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TGky6zKfhrisXh92emTvPAbkenhXHTU8m6',
    BFactory:'TYFMTMFQKnm23o5RxhYLMN94NSnb3cpgQx',
    MasterChef:'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager:'TMAJmEkLG8G4mw3LZ7xrCjYRmNksdBSi9B',
    RewardToken:'TSgdjJHEr18FAF6Wyk8hFmgoQwCyqe5gYU'
  }
}else{
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory:'TNAd68JeNC6LKZony8cheLNYvHRSR4s62w',
    MasterChef:'THwvpZSsEuzPMRPpT3H12fgkSEYhmisym2',
    FactoryManager:'TEXQNtvpusaQUGTn9p9Wt1segK3HcEu72U',
    RewardToken:'TE7T2KT2jK8CWkhSA9YWeFa2TBJZMrPKPv'
  }
}
export default ipConfig

