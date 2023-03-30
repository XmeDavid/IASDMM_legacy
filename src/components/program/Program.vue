<template>
    <div>
        <button @click="send">TitleScreen</button>
    </div>
</template>
<script>
import { invoke } from '@tauri-apps/api/tauri'
export default {
    methods: {
        async send() {
            await invoke('send_data', { data: JSON.stringify({
                routeName: 'TitleView',
                data: {
                    title: 'IASD',
                    subTitle: 'Gandara dos Olivais',
                    content: 'This is a hymn'
                }
            }), windowLabel: 'external_0'})
        }
    }
}
</script>
<style>
    
</style>