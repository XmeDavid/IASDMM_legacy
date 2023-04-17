<template>
    <div class="p-4 grid grid-cols-2 h-full">
        <div class="w-full flex flex-row">
            <h1 class="text-2xl text-zinc-800 dark:text-zinc-200 select-none">Settings</h1>
            <hr>
            <DisplaySettings :config="config"/>
            <hr>
        </div>
        <div class="w-full flex flex-col">
            <MusicSettings :config="config"/>
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
import { emit, listen } from '@tauri-apps/api/event'
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
export default {
    name: "Settings",
    components: {
        DisplaySettings,
        MusicSettings
    },
    data(){
        return {
            config: {backgroundMusicPath: '', monitors: []},
        }
    },
    methods: {
        async load(){
            this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
            if(!this.config.backgroundMusicPath){
                this.config.backgroundMusicPath = ''
            }
            if(!this.config.monitors){
                this.config.monitors = []
            }
        },
        async save(){
            console.log(this.config)
            let json_str = JSON.stringify(this.config)
            await writeTextFile('app.conf', json_str, { dir: BaseDirectory.AppData })
            emit('reload-music', {
                reload: true,
            })
        }
    },
    created(){
        this.load()
    }
}
</script>
<style>
    
</style>