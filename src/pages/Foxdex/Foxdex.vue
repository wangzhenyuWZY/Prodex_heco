<template>
<div class="cont">
    {{$t('nav.message')}} 
    {{$t('nav.Home')}} 
    <button @click="hdel">切换</button>
</div>

</template> 

<script>

export default {
  
        data() {
            return {
                
            }
        },
        methods: {
            hdel (n) {
                        let i18n =  this.$i18n.locale;
                    this.$i18n.locale = i18n == 'en' ? 'zh':'en'
            }
        },
}
</script>

<style lang="scss">

.cont{
    margin-top: 500px;
    width: 200px;
    font-size: 24px;
    font-family: 'roboto-mediumitalice';
    margin-left: 500px;
}

</style>