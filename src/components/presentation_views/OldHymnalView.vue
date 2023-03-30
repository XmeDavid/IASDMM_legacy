<template lang="">
    <div>
        <h1 class="text-2xl" >{{data.title}}</h1>
        <h2 class="text-lg">{{ data.content }}</h2>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null
        }
    },
    created() {
        this.data = JSON.parse(this.$router.currentRoute.value.params.data)
    }
}
</script>
<style lang="">
    
</style>