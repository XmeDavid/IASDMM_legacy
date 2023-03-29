<template>
    <div class="p-4">
        <h1 class="text-2xl text-zinc-800 dark:text-zinc-200">Settings</h1>
        <div class="w-1/2">
            <hr>
            <DisplaySettings ref="displaySettingsRef"/>
            <hr>
        </div>
        <button @click="save">Save</button>
    </div>
</template>
<script>
import DisplaySettings from "./DisplaySettings.vue"
import {ref} from 'vue';    
export default {
    name: "Settings",
    components: {
        DisplaySettings
    },
    data(){
        return {
        }
    },
    methods: {
        save(){
            this.$refs.displaySettingsRef.save()
        }
    },
}
</script>
<style>
    
</style>