<template>
    <div class="breakdownCon">
        <div class="breakTitle">
            <h2>Your Prodex Breakdown</h2>
            <i class="closeico"></i>
        </div>
        <div class="breakcon">
            <p>Prodex price:<span>$19.54</span></p>
            <p>Prodex in circulation:<span>289,227,438</span></p>
            <p>Total Supply<span>1,000,000,000</span></p>
        </div>
        <a class="view">View Prodex Analytics</a>
    </div>
</template>
<style lang='less' scoped>
.breakdownCon{
    position:absolute;
    top:240px;
    left:50%;
    width:375px;
    margin-left:-185px;  
    padding-bottom:18px;
    background: #373330;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    z-index:99;
    background-image: url(../assets/img/icon12.png);
    background-position: right 27px top 20px;
    background-repeat: no-repeat;
    background-size:139px 181px;
    .breakTitle{
        border-bottom:1px solid #232221;
        h2{
            padding-left:15px;
            font-size:16px;
            color:#fff;
            line-height:52px;
        }
        .closeico{
            position:absolute;
            top:10px;
            right:13px;
            width:26px;
            height:26px;
            background: url(../assets/img/icon7.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
    }
    .breakcon{
        padding:10px 15px 20px;
        p{
            font-size:14px;
            color:#fff;
            line-height:30px;
            span{
                float:right;
            }
        }
    }
    .view{
        font-size:13px;
        color:#009346;
        line-height:18px;
        cursor: pointer;
        padding-left:15px;
    }
}
@media screen and (max-width: 750px) {
    .breakdownCon{
        top:auto;
        bottom:0;
        left:0;
        margin-left:0;
    }
}
</style>