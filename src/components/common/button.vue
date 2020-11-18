<template>
    <div>
        <div class="from_botton"  :style="{'line-height':height+'px','width':width+'px',fontSize:size+'px'}" @click="()=>this.$emit('childClick')">{{text}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            text:{
                type:String,
                default:'hello'
            },
            height: {
                type:String,
                default:'64'
            },
            size:{
                type:String,
                default:'20'
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.from_botton{
    width: 320px;
    background: linear-gradient(136deg, #FDAB2B 0%, #DF0019 100%);
    border-radius: 32px;
    line-height: 64px;
    text-align: center;
    margin:0 auto;
    margin-top: 86px;
    font-size: 20px;
    font-family: ArialMT;
    color: #FFFFFF;
    cursor: pointer;
    user-select:none;
}
</style>