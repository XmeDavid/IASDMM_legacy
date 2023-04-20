<template>
    <img :src="path" alt="Presentation Image" class="object-contain bg-black">
</template>
<script>
import { emit, listen } from '@tauri-apps/api/event'
import { convertFileSrc } from '@tauri-apps/api/tauri';
export default {
    data() {
        return {
            listener: null,
            data: null,
            path: null
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
    created() {
        this.data = JSON.parse(this.$router.currentRoute.value.params.data)
        this.path = convertFileSrc(this.data.path)
    }
}
</script>
<style>
</style>