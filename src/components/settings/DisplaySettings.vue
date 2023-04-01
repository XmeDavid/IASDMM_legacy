<template>
    <div class="flex flex-row items-center">
        <p class="m-2 grow text-sm text-zinc-500">Select which displays will have content projected on</p>
        <div>
            <div v-for="monitor in monitors" :key="monitor.id" class="flex flex-col">
                <div class="flex flex-row items-center">
                    <input type="checkbox" :id="monitor.name"  v-model="monitor.isProjector" class="mr-2">
                    <label class="whitespace-nowrap text-zinc-700 dark:text-zinc-300">Enable {{monitor.name}}</label>
                </div>
                <div class="flex flex-row items-center">
                    <input type="checkbox" :id="monitor.id" v-model="monitor.isFullscreen" class="mr-2">
                    <label class="whitespace-nowrap text-zinc-700 dark:text-zinc-300">Fullscreen {{monitor.name}}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { availableMonitors } from '@tauri-apps/api/window';
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
export default {
    name: "DisplaySettings",
    components: {
    },
    data() {
        return {
            config: {},
            monitors: null
        }
    },
    methods: {
        async getMonitors() {
            var id = -1
            this.monitors = (await availableMonitors()).map(monitor => {
                id += 1
                return {
                    id: id,
                    name: monitor.name,
                    scaleFactor: monitor.scaleFactor,
                    size: monitor.size,
                    position: monitor.position,
                    isProjector: false,
                    isFullscreen: false,
                }
            })
        },
        async load(){
            await this.getMonitors()
            this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
            const previousMonitors = this.config.previousMonitors
            this.monitors.forEach(monitor => {
                previousMonitors.forEach(previousMonitor => {
                    if (monitor.id == previousMonitor.id){
                        monitor.isProjector = previousMonitor.isProjector
                        monitor.isFullscreen = previousMonitor.isFullscreen
                    }
                })
            });
        },
        async save(){
            this.config.previousMonitors = this.monitors
            let json_str = JSON.stringify(this.config)
            await writeTextFile('app.conf', json_str, { dir: BaseDirectory.AppData })
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