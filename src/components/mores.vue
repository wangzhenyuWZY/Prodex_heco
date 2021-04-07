<template>
    <div class="moreContainer" @click.stop>
        <p>
            <img src="../assets/img/icon18.png">
            About
        </p>
        <!-- <p>
            <img src="../assets/img/icon19.png">
            Docs
        </p> -->
        <p>
            <img src="../assets/img/icon20.png">
            Github
        </p>
        <!-- <p>
            <img src="../assets/img/icon21.png">
            Discord
        </p>
        <p>
            <img src="../assets/img/icon22.png">
            Analytics
        </p> -->
    </div>
</template>
<style lang='less' scoped>
.moreContainer{
    position:fixed;
    right:15px;
    top:70px;
    width: 100px;
    height: 90px;
    background: #3D3B39;
    border-radius: 12px;
    box-sizing: border-box;
    padding:15px;
    z-index:99;
    p{
        padding-bottom:15px;
        font-size:13px;
        color:#C4C2BE;
        line-height:18px;
        cursor: pointer;
        img{
            width:13px;
            height:13px;
            margin-right:6px;
        }
    }
}
@media screen and (max-width: 750px) {
    .moreContainer{
        top:auto;
        bottom:80px;
    }
}
</style>