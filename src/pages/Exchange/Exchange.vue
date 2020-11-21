<template>
<div class="container">
<div>
  <fromBox></fromBox>
    
</div>
</div>
  
</template>

<script>
import fromBox from '@/components/common/fromBox.vue'
export default {
    data() {
        return {
            key: ''
        }
    },
    components:{
        fromBox
    }
}
</script>

<style lang="scss" scoped>

</style>