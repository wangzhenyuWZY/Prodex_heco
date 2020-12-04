export const tokenList = [
    { 
        name:'WTRX',
        address:'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
        img:'111',
        balance:0,
        decimals:6
    },
    { 
        name:'USDT',
        address:'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        img:'',
        balance:0,
        decimals:8
    }
]
export const pairList = [
    {
        address:'TABdMKUCX81wRA7PRQxXzKBTQEGYZjbeUD',
        token1:{ 
            name:'WTRX',
            address:'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
            img:'111',
            balance:0,
            decimals:6
        },
        token2:{ 
            name:'USDT',
            address:'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
            img:'',
            balance:0,
            decimals:6
        },
        pair:'WTRX/USDT',
        decimals:18
    }
]

const tokenData = {
    tokenList,
    pairList
}
export default tokenData