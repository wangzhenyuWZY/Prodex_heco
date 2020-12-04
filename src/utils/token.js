










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
        decimals:6
    },
    { 
        name:'FOX',
        address:'TCakeKXQub9efsXtBTohPRA1pfmL2GZ9DU',
        img:'',
        balance:0,
        decimals:18
    }
]
export const pairList = [
    {
        address:'TV6jcZt8QDcDmw3yMgrWYumRNBrrPQhfJq',
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
    },
    {
        address:'TMDpAWJGPaFGbThPAAs6oGdRfhnEv67yxL',
        token1:{ 
            name:'FOX',
            address:'TCakeKXQub9efsXtBTohPRA1pfmL2GZ9DU',
            img:'',
            balance:0,
            decimals:18
        },
        token2:{ 
            name:'USDT',
            address:'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
            img:'',
            balance:0,
            decimals:6
        },
        pair:'FOX/USDT',
        decimals:18
    }
]

const tokenData = {
    tokenList,
    pairList
}
export default tokenData

