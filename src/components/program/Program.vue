<template>
    <div>
        <button @click="send">Main page to control the program</button>
    </div>
</template>
<script>
import { invoke } from '@tauri-apps/api/tauri'
export default {
    methods: {
        async send() {
            await invoke('send_data', { data: JSON.stringify({
                routeName: 'OldHymnalView',
                data: {
                    title: 'Hymn 1',
                    content: 'This is a hymn'
                }
            }), windowLabel: 'external_0'})
        }
    }
}
</script>
<style>
    
</style>