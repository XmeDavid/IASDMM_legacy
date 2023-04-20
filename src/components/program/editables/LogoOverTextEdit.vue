<template>
  <div class="grid grid-rows-2">
        <div class="flex flex-row items-center">
            <div class="grid grid-rows-2 grow p-2 h-16">
                <label for="musicPath" class="whitespace-nowrap select-none text-zinc-700 dark:text-zinc-300">Select Background Image</label>
                <input id="musicPath" type="text" disabled :value="data.bgPath" class="p-1 rounded-md bg-stone-300 dark:bg-stone-700 text-black dark:text-zinc-100 grow">
            </div>
            <button @click="selectBg" class="bg-bluejay-500 dark:bg-bluejay-700 hover:bg-bluejay-600 dark:hover:bg-bluejay-600 rounded-lg w-20 h-12 font-medium text-white"> Select </button>
        </div>
        <div class="flex flex-row items-center">
            <div class="grid grid-rows-2 grow p-2 h-16">
                <label for="musicPath" class="whitespace-nowrap select-none text-zinc-700 dark:text-zinc-300">Select Logo Image</label>
                <input id="musicPath" type="text" disabled :value="data.logoPath" class="p-1 rounded-md bg-stone-300 dark:bg-stone-700 text-black dark:text-zinc-100 grow">
            </div>
            <button @click="selectLogo" class="bg-bluejay-500 dark:bg-bluejay-700 hover:bg-bluejay-600 dark:hover:bg-bluejay-600 rounded-lg w-20 h-12 font-medium text-white"> Select </button>
        </div>
        <div class="grid grid-cols-3">
            <div class="p-1 pt-5 col-span-2 relative">
                <label for="old-hymnal-edit" class="absolute text-xs top-1 left-2 text-zinc-600 dark:text-zinc-400">Texto</label>
                <input type="text" v-model="data.text" id="old-hymnal-edit" class="block w-full p-1 rounded-lg font-normal text-lg text-black dark:text-zinc-200 bg-neutral-200 dark:bg-zinc-800 placeholder-neutral-600 dark:placeholder-zinc-400 bg-opacity-50 dark:bg-opacity-80" placeholder="Texto Principal" required>
            </div>
            <div class="p-1 pt-5   relative">
                <label for="old-hymnal-edit" class="absolute text-xs top-1 left-2 text-zinc-600 dark:text-zinc-400">Accent Color</label>
                <input type="text" v-model="data.color" id="old-hymnal-edit" class="block w-full p-1 rounded-lg font-normal text-lg text-black dark:text-zinc-200 bg-neutral-200 dark:bg-zinc-800 placeholder-neutral-600 dark:placeholder-zinc-400 bg-opacity-50 dark:bg-opacity-80" placeholder="Accent Color" required>
            </div>
        </div>
  </div>
</template>

<script>
import { open } from '@tauri-apps/api/dialog';
import { pictureDir } from '@tauri-apps/api/path';
export default {
    name: "LogoOverTextEdit",
    props: {
        data:{
            type: Object,
            required: true,
        }
    },
    methods:{
        async selectBg(){
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Image',
                    extensions: ['png', 'jpeg', 'jpg']
                }],
                defaultPath: await pictureDir(),
            });
            if (selected === null) {
                console.log("No folder selected")
            } else {
                this.data.bgPath = selected
            }
        },
        async selectLogo(){
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Image',
                    extensions: ['png', 'jpeg', 'jpg']
                }],
                defaultPath: await pictureDir(),
            });
            if (selected === null) {
                console.log("No folder selected")
            } else {
                this.data.logoPath = selected
            }
        },
    },
}
</script>
<style>
</style>