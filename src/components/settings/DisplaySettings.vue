<template>
    <div class="flex flex-row items-center">
        <p class="m-2 grow text-sm text-zinc-500">Select which displays will have content projected on</p>
        <div>
            <div v-for="monitor in config.monitors" :key="monitor.name" class="flex flex-col">
                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="monitor.isProjector" class="mr-2">
                    <label class="whitespace-nowrap text-zinc-700 dark:text-zinc-300">Enable {{monitor.name}}</label>
                </div>
                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="monitor.isFullscreen" class="mr-2">
                    <label class="whitespace-nowrap text-zinc-700 dark:text-zinc-300">Fullscreen {{monitor.name}}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { availableMonitors } from '@tauri-apps/api/window';
export default {
    name: "DisplaySettings",
    components: {
    },
    props: {
        config: {
            type: Object,
            required: true,
        }
    },
    methods: {
        parseRegex(s){
            const regex = /[^a-zA-Z0-9]+/g;
            return s.replaceAll(regex,'');
        },
        async load(){
            //Gets current monitors
            const monitors = (await availableMonitors()).map(monitor => {
                return {
                    name: this.parseRegex(monitor.name),
                    scaleFactor: monitor.scaleFactor,
                    size: monitor.size,
                    position: monitor.position,
                    isProjector: false,
                    isFullscreen: false,
                }
            });
            //Gets previously saved monitors
            const previousMonitors = this.config.monitors;
            //Updates config, adding the monitors that were not previously there
            monitors.forEach(monitor => {
                if(!previousMonitors.find(_m => _m.name == monitor.name)){
                    this.config.monitors.push(monitor)
                }
            });
        },
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