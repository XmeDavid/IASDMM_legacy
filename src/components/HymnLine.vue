<template>
    <div class="flex flex-row h-12 m-2 rounded-lg hover:bg-opacity-50 dark:hover:bg-opacity-70 hover:bg-gray-100 dark:hover:bg-zinc-800 bg-opacity-70 hover:shadow-md shadow-zinc-400 dark:shadow-zinc-700">
        <div @click="run" class="p-2 grow">
            <span class="m-2 font-bold text-xl transition duration-75 text-c-bluejay group-hover:text-black dark:group-hover:text-white">{{hymn.number}}</span>
            <span class="m-2 font-bold text-xl ml-2 mr-2">-</span>
            <span class="m-2 font-bold text-xl transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"> {{hymn.name}}</span>
        </div>
        <button @click="options" class="text-c-bluejay rounded-lg h-12 w-12 grid place-items-center  hover:bg-zinc-400 hover:dark:bg-zinc-900 hover:shadow-inner hover:dark:shadow-zinc-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
        </button>
    </div>
</template>

<script>
import { availableMonitors } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow, WebviewWindow, LogicalPosition  } from '@tauri-apps/api/window'
import { emit, listen } from '@tauri-apps/api/event'
export default {
    props: {
        hymn:{
            type: Object,
            required: true,
        }
    },
    methods:{
        run(){/*
            var test = JSON.stringify(this.hymn)
            var encoded = encodeURIComponent(test)
            var webview = WebviewWindow.getByLabel('hinario');
            if(webview != null){ return }
            webview = new WebviewWindow('hinario', {
                url: `/#/isSecHinario?${encoded}`,
            })*/
            console.log("Run")
        },
        options(){
            console.log("Options")
        }
    }
}
</script>

<style>

</style>