<template lang="">
    <div class="">
        <hr>
        <div class="flex flex-row items-center">
            <div class="grid grid-rows-2 grow p-2 h-16">
                <label for="musicPath" class="whitespace-nowrap select-none text-zinc-700 dark:text-zinc-300">Select image path</label>
                <input id="musicPath" type="text" disabled :value="data.path" class="p-1 rounded-md bg-stone-300 dark:bg-stone-700 text-black dark:text-zinc-100 grow">
            </div>
            <button @click="selectPath" class="bg-bluejay-500 dark:bg-bluejay-700 hover:bg-bluejay-600 dark:hover:bg-bluejay-600 rounded-lg w-20 h-12 font-medium text-white"> Select </button>
        </div>
        
    </div>
</template>
<script>
import { open } from '@tauri-apps/api/dialog';
import { pictureDir } from '@tauri-apps/api/path';
export default {
    name: "ImageEdit",
    props: {
        data:{
            type: Object,
            required: true,
        }
    },
    methods:{
        async selectPath(){
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Image',
                    extensions: ['png', 'jpeg']
                }],
                defaultPath: await pictureDir(),
            });
            if (selected === null) {
                console.log("No folder selected")
            } else {
                this.data.path = selected
            }
        },
    },
    mounted(){
    }
}
</script>
<style>  
</style>