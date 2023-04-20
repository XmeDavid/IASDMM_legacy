<template lang="">
    <div>
        <h1 class="text-2xl" >{{data.title}}</h1>
        <h2 class="text-lg">{{ data.content }}</h2>
    </div>
</template>
<script>
import { emit, listen } from '@tauri-apps/api/event'
export default {
    data() {
        return {
            data: null,
            listener: null
        }
    },
    methods: {
        async listen() {
            this.listener = await listen('presentation-data', (event) => {
                let data = JSON.parse(event.payload.data)
                this.$router.push({
                    name: data.routeName,
                    params: {data: JSON.stringify(data.data)}
                })
            })
        }
    },
    mounted() {
        this.listen()
    },
    created() {
        this.data = JSON.parse(this.$router.currentRoute.value.params.data)
    }
}
</script>
<style lang="">
    
</style>