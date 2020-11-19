<template>
        <div class="from_botton" :class="className"  :style="{'line-height':height+'px',fontSize:size+'px'}" @click="(evt)=>this.$emit('click',evt)">{{text}}</div>
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
            },
            className: {
                type:String,
                default: ''
            },

        },
        
    }
</script>

<style lang="scss" scoped>
.from_botton{
    display: inline-block;
    width: 100%;
    background: linear-gradient(136deg, #FDAB2B 0%, #DF0019 100%);
    border-radius: 32px;
    line-height: 64px;
    text-align: center;
    margin:0 auto;
    font-size: 20px;
    font-family: ArialMT;
    color: #FFFFFF;
    cursor: pointer;
    user-select:none;
}
</style>