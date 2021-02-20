<template>
    <div class="downContainer">
        <h2>手机下载 DOTC APP</h2>
        <div class="imgcon">
            <img src="../../assets/img/phone.png">
        </div>
        <a class="downbtn active">Android 下载</a>
        <a class="downbtn">iPhone 下载</a>
    </div>
</template>
<style lang='less' scoped>
.downContainer{
    padding:48px 38px;
    h2{
        font-size:20px;
        color:#fff;
        line-height:42px;
        text-align:center;
        padding-bottom:30px;
    }
    .imgcon{
        text-align:center;
        img{
            width:240px;
        }
    }
    .downbtn{
        display:block;
        margin-top:30px;
        height:50px;
        width:100%;
        line-height:50px;
        text-align:center;
        background: linear-gradient(180deg, #404040 0%, #232323 100%);
        box-shadow: 4px 4px 2px 0px rgba(0, 0, 0, 0.24);
        border-radius: 4px; 
        border: 1px solid #131313;
        font-size:17px;
        color:#fff;
        &.active{
            background: linear-gradient(179deg, #FBBA45 0%, #D98600 100%);
            box-shadow: 4px 4px 2px 0px rgba(86, 57, 15, 0.24);
            border: 1px solid #FF9E00;
        }
    }
}
</style>