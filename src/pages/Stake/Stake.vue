<template>
<div class="stake">
        <ul class="stake_list">
            <li  v-for="(idx,index) in list" :key='idx.name+index'>
                <div class="stake_top"> 
                    <span class="lt_icon">    
                        <img class="lt_icon" src="@/assets/img/icon_down.svg" alt="" /> 
                        <img class="lt_icon" src="@/assets/img/icon_down.svg" alt="" /> 
                    </span>
                    <span class="content_zise">
                        Uni ETH-USDT
                    </span>
                </div>
                <div class="stake_addres">
                    <div > <span class="lt_addres">Deposit:</span> <span class="rg_addres">{{idx.name}}</span></div>
                    <div  class="mrg"> <span class="lt_addres">Earn:</span> <span class="rg_addres">{{idx.name2}}</span></div>
                </div>
                <div class="stake_btn">{{idx.account}}%APY</div>
            </li>
           
        </ul>
</div>
  
</template>

<script>

export default {
    data() {
        return {
            list:[
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },
                {
                    name:'fUNISWAP_LP',
                    name2:'FARM',
                    account:'12.04%'
                },


            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.stake{
    max-width: 1024px;
    margin: 0 auto;
}
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 40px;
        li{
            width: 320px;
            box-sizing: border-box;
            background: #171F30;
            border-radius: 4px;
            padding: 37px 42px;
            margin-bottom: 32px;
            .content_zise{
                font-size: 20px;
                font-family: Arial-BoldMT, Arial;
                font-weight: normal;
                color: #EEEEF0;
                vertical-align: middle;
            }
            .lt_icon{
                >img{
                    vertical-align: middle;
                }
            }
            .stake_addres{
                margin-top:40px;
                margin-bottom: 40px;
                    >span{
                        display: inline-block;
                    }
                    .mrg{
                        margin-top: 18px;
                    }
                    
                    .lt_addres{
                        font-size: 20px;
                        font-family: ArialMT;
                        color: #878B97;
                        text-align: right;
                        display: inline-block;
                        width: 74px;
                    }
                    .rg_addres{
                        font-size: 18px;
                        font-family: Arial-BoldMT, Arial;
                        font-weight: normal;
                        color: #EEEEF0;

                    }
            }
            .stake_btn{
                        width: 200px;
                        height: 48px;
                        line-height: 48px;
                        border-radius: 32px;
                        border: 1px solid #FF5D37;
                        text-align: center;
                        font-size: 18px;
                        font-family: Arial-BoldMT, Arial;
                        font-weight: normal;
                        color: #FF5D37;
                        margin: 0 auto;
                        cursor: pointer;
                    }
        }
    }

</style>