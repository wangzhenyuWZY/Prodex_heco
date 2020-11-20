<template>
        <!-- <div class="from_botton" :class="className"  :style="{'line-height':height+'px',fontSize:size+'px'}" @click="(evt)=>this.$emit('click',evt)">{{text}}</div> -->
        <el-button class="from_botton" :class="className"  :style="{'height':height+'px',fontSize:size+'px'}" @click="(evt)=>this.$emit('click',evt)" >{{text}}</el-button>
        
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
        created() {
            console.log(this.props)
        },
        
    }
</script>

<style lang="scss" scoped>
.from_botton{
    display: block;
    width: 100%;
    background: linear-gradient(136deg, #FDAB2B 0%, #DF0019 100%);
    border-radius: 32px;
    height: 64px;
    text-align: center;
    margin:0 auto;
    font-size: 20px;
    font-family: ArialMT;
    color: #FFFFFF;
    cursor: pointer;
    user-select:none;
    border: none;
}
</style>