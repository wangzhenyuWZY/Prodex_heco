<template>
    <div class="tokenContainer">
        <h2 class="title">Select a token<i></i></h2>
        <i class="closeico" @click="closePop"></i>
        <input class="searchput" placeholder="Search name or paste address">
        <h2 class="title">Common bases<i></i></h2>
        <div class="commonCoin">
            <div class="coinitem"><img>ETH</div>
            <div class="coinitem"><img>ETH</div>
            <div class="coinitem"><img>ETH</div>
            <div class="coinitem"><img>ETH</div>
            <div class="coinitem"><img>ETH</div>
            <div class="coinitem"><img>ETH</div>
        </div>
        <div class="tokenlisttop clearfix">
            <span>Token Name</span>
            <i class="sortico"></i>
        </div>
        <div class="tokenlistbar">
            <ul class="tokenlist">
                <li v-for="(item,index) in tokens" :key="index" @click="changeToken(item)"><img :src="item.logoURI">{{item.name}}</li>
            </ul>
        </div>
        <div class="tokenlistbtm clearfix">
            <span class="fl">Uniswap Default List</span>
            <span class="fr">Change</span>
        </div>
    </div>
</template>
<script>
import defaultTokenList from '@uniswap/default-token-list'
export default {
  data() {
    return {
      tokens:defaultTokenList.tokens
    }
  },
  mounted() {
    this.tokens.push({
        name:'ST1',
        logoURI:'',
        address:'0xA255E08287EBeF8Af8B6055983f73dBc22bD4B13',
        decimals:18
    })
    this.tokens.push({
        name:'ST2',
        logoURI:'',
        address:'0xD926c882469b0522655f28e97C5b4F3d72a5d81f',
        decimals:18
    })
    this.tokens.push({
        name:'ST3',
        logoURI:'',
        address:'0x55BC716a9d95767c821d37780aa33ea975E2C4A8',
        decimals:18
    })
    this.tokens.push({
        name:'ST4',
        logoURI:'',
        address:'0xCFeE4592B754B64429eC5ab5d18C517563729899',
        decimals:18
    })
  },
  methods: {
    closePop(){
        this.$emit('closePop')
    },
    changeToken(item){
        this.$emit('change',item)
    }
  }
}
</script>
<style lang='less' scoped>
.tokenContainer{
    position:absolute;
    top:0;
    left:0;
    right:0;
    background:#232221;
    border-radius:20px;
    z-index:99;
    .title{
        float:left;
        padding:15px 0 10px 15px;
        font-size:12px;
        color:#C4C2BE;
        i{
            display:inline-block;
            vertical-align: middle;
            width:16px;
            height: 16px;
            background:url(../assets/img/icon13.png) no-repeat center;
            background-size:100% 100%;
            margin-left:10px;
        }
    }
    .commonCoin{
        clear: both;
        overflow: hidden;
        .coinitem{
            min-width: 72px;
            height: 36px;
            border-radius: 6px;
            border: 1px solid #484744;
            font-size:14px;
            color:#C4C2BE;
            line-height:36px;
            text-align:center;
            float:left;
            margin-left:10px;
            margin-bottom:10px;
            cursor: pointer;
            img{
                vertical-align: middle;
                width:16px;
                height:16px;
                margin-right:6px;
                margin-top:-3px;
            }
        }
    }
    .closeico{
        float:right;
        width:26px;
        height:26px;
        background: url(../assets/img/icon7.png) no-repeat center;
        background-size:100% 100%;
        cursor: pointer;
        margin-top:15px;
        margin-right:15px;
    }
    .searchput{
        width: 315px;
        height: 60px;
        box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
        border-radius: 12px;
        border: 1px solid #38393B;
        clear:both;
        margin:0 0 10px 15px;
        padding:0 15px;
        box-sizing: border-box;
        font-size:14px;
        color:#fff;
        line-height:60px;
        background:none;
        outline: none;
        margin-top:10px;
        &::-webkit-input-placeholder{color:#837F76;}
    }
    .tokenlisttop{
        border-bottom:1px solid #282827;
        padding:0 15px 10px;
            clear: both;
        span{
            font-size:12px;
            color:#C4C2BE;
            line-height:36px;
        }
        .sortico{
            float:right;
            width:36px;
            height:36px;
            background:url(../assets/img/icon6.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
    }
    .tokenlistbar{
        height:200px;
        overflow-y:scroll;
            &::-webkit-scrollbar-track-piece {
                -webkit-border-radius: 0
            }
            &::-webkit-scrollbar {
                width: 5px;
                height: 10px
            }
            &::-webkit-scrollbar-thumb {
                height: 50px;
                background-color: #b8b8b8;
                -webkit-border-radius: 6px;
                outline-offset: -2px;
                -moz-opacity: 0.5;
                -khtml-opacity: 0.5;
                opacity: 0.5
            }
            &::-webkit-scrollbar-thumb:hover {
                height: 50px;
                background-color: #878987;
                -webkit-border-radius: 6px
            } 
        .tokenlist{
            li{
                height:50px;
                padding-left:15px;
                font-size:14px;
                color:#C4C2BE;
                line-height:50px;
                cursor: pointer;
                img{
                    width:20px;
                    margin-right:10px;
                }
            }
        }
    }
    .tokenlistbtm{
        border-top:1px solid #2F2E2C;
        padding:0 15px;
        span{
            font-size:14px;
            color:#C4C2BE;
            line-height:70px;
            cursor: pointer;
            &.fl{float:left;}
            &.fr{float:right;}
        }
    }
}
</style>