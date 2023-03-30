<template lang="">
    <div>
        <h1>Presentation</h1>
    </div>
</template>
<script>
import { emit, listen } from '@tauri-apps/api/event'
export default {
    name: "PresentationView",
    data() {
        return {
            listener : null,
        }
    },
    methods: {
        async listen() {
            this.listener = await listen('presentation-data', (event) => {
                let data = JSON.parse(event.payload)
                //console.log(data.data)
                this.$router.push({
                    name: data.routeName,
                    params: {data: JSON.stringify(data.data)}
                })
                
            })
        }
    },
    mounted() {
        this.listen()
    }
}
</script>
<style lang="">
    
</style>