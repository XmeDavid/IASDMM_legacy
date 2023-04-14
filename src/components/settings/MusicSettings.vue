<template>
    <div class="flex flex-row items-center">
        <div class="grid grid-rows-2 grow p-2 h-16">
            <label for="musicPath" class="whitespace-nowrap select-none text-zinc-700 dark:text-zinc-300">Select folder for audio player</label>
            <input id="musicPath" type="text" disabled :value="path" class="p-1 rounded-md bg-stone-300 dark:bg-stone-700 text-black dark:text-zinc-100 grow">
        </div>
        <button @click="selectPath" class="bg-bluejay-500 dark:bg-bluejay-700 hover:bg-bluejay-600 dark:hover:bg-bluejay-600 rounded-lg w-20 h-12 font-medium text-white"> Select </button>
    </div>
</template>
<script>
import {ref} from 'vue';    
import { open } from '@tauri-apps/api/dialog';
import { audioDir } from '@tauri-apps/api/path';
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { emit, listen } from '@tauri-apps/api/event'
export default {
    name: "DisplaySettings",
    components: {
    },
    data() {
        return {
            path: "",
            config: {},
        }
    },
    methods: {
        async selectPath(){
            const selected = await open({
                directory: true,
                multiple: false,
                defaultPath: await audioDir(),
            });
            if (selected === null) {
                console.log("No folder selected")
            } else {
                this.path = selected
            }
        },
        async load(){
            this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
            this.path = this.config.backgroundMusicPath
        },
        async save(){
            this.config.backgroundMusicPath = this.path
            let json_str = JSON.stringify(this.config)
            await writeTextFile('app.conf', json_str, { dir: BaseDirectory.AppData })
            emit('reload-music', {
                reload: true,
            })
        }
    },  
    mounted() {
        this.load()
    },
    beforeUnmount() {
        //this.save()
    },
}
</script>
<style>
    
</style>