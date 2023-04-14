<template>
    <div class="p-4 grid grid-cols-2 h-full">
        <div class="w-full flex flex-row">
            <h1 class="text-2xl text-zinc-800 dark:text-zinc-200 select-none">Settings</h1>
            <hr>
            <DisplaySettings ref="displaySettingsRef"/>
            <hr>
        </div>
        <div class="w-full flex flex-col">
            <MusicSettings ref="musicSettingsRef"/>
            <div class="grow"></div>
            <div class="flex flex-row">
                <div class="grow"></div>
                <button @click="save" class="rounded-lg py-2 px-4 bg-tree-frog-700  font-semibold  text-white hover:bg-tree-frog-600">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
import DisplaySettings from "./DisplaySettings.vue"
import MusicSettings from "./MusicSettings.vue";
import {ref} from 'vue';    
export default {
    name: "Settings",
    components: {
        DisplaySettings,
        MusicSettings
    },
    data(){
        return {
        }
    },
    methods: {
        save(){
            this.$refs.displaySettingsRef.save()
            this.$refs.musicSettingsRef.save()
        }
    },
}
</script>
<style>
    
</style>