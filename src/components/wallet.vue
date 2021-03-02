<template>
    <div class="walletContainer">
        <div class="walletTitle">
            <h2>Connect to a <br>wallet</h2>
            <i class="closeico"></i>
        </div>
        <div class="walletCon">
            <div class="walletItem clearfix">
                <span class="walletName">WalletConnect</span>
                <img class="walletLogo" src="../assets/img/icon23.png">
            </div>
            <div class="walletItem clearfix">
                <span class="walletName">Open in Coinbase Wallet</span>
                <img class="walletLogo" src="../assets/img/icon24.png">
            </div>
            <div class="walletItem clearfix">
                <span class="walletName">Fortmatic</span>
                <img class="walletLogo" src="../assets/img/icon25.png">
            </div>
            <p class="moreWallet">New to Ethereum?<a> Learn more about wallets</a></p>
        </div>
    </div>
</template>
<style lang='less' scoped>
.walletContainer{
    position:absolute;
    top:108px;
    left:50%;
    width:375px;
    margin-left:-185px;
    z-index:99;
    .walletTitle{
        height: 70px;
        background: #3D3B39;
        border-radius: 20px 20px 0px 0px;
        h2{
            font-size:14px;
            color:#C4C2BE;
            line-height:20px;
            padding-top:16px;
            padding-left:15px;
        }
        .closeico{
            position:absolute;
            right:15px;
            top:14px;
            width:26px;
            height:26px;
            background:url(../assets/img/icon7.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
    }
    .walletCon{
        padding:15px;
        background:#232221;
        border-radius: 0px 0px 20px 20px;
        .walletItem{
            height: 60px;
            box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
            border-radius: 12px;
            border: 1px solid #38393B;
            padding:15px;
            margin-bottom:10px;
            .walletName{
                float:left;
                font-size:14px;
                color:#C4C2BE;
                line-height:23px;
            }
            .walletLogo{
                float:right;
                width:22px;
            }
        }
        .moreWallet{
            font-size:12px;
            color:#C4C2BE;
            line-height:18px;
            text-align:center;
            a{
                color:#F8941F;
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .walletContainer{
        top:auto;
        bottom:0;
        left:0;
        margin-left:0;
        width:100%;
        border-radius:20px 20px 0px 0px;
    }
}
</style>