<template lang="">
    <div>
        This is poggers! {{data.title}}
        {{data.content}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null
        }
    },
    mounted() {
        this.data = JSON.parse(this.$router.currentRoute.value.params.data)
        console.log(this.data)
    }
}
</script>
<style lang="">
    
</style>