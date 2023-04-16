<template>
    <img :src="path" alt="Presentation Image" class="object-contain bg-black">
</template>
<script>
import { convertFileSrc } from '@tauri-apps/api/tauri';
export default {
    data() {
        return {
            data: null,
            path: null
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