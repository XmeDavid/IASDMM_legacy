<template>
  <div>
    <button
      type="button"
      @click="toggleWindows"
      :class="{
        'bg-c-bluejay hover:bg-c-bluejay-light': isProjected,
        'hover:bg-gray-100 dark:hover:bg-zinc-800  ': !isProjected
      }"
      class="text-sm group h-12 w-12 rounded-lg p-2.5 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      :class="{
        'text-white': isProjected,
        'text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white': !isProjected
      }" 
      class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </button>
  </div>
</template>
<script>
import { availableMonitors } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri'
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { WebviewWindow } from '@tauri-apps/api/window'
export default {
  data() {
    return {
      isProjected: false
    };
  },
  mounted() {
  },
  methods: {
    async getMonitors() {
      var id = -1
      return (await availableMonitors()).map(monitor => {
        id += 1
        return {
          id: id,
          name: monitor.name,
          scaleFactor: monitor.scaleFactor,
          size: monitor.size,
          position: monitor.position,
          isProjector: false
        }
      })
    },
    async getMonitorsConfig(){
      const config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
      return config.previousMonitors
    },
    async toggleWindows(){
      if(this.isProjected){
        this.closeWindows()
      }else{
        this.projectWindows()
      }
    },
    async closeWindows(){
      const monitors = await this.getMonitors()
      monitors.forEach(monitor => {
        invoke('close_window', { windowLabel: `external_${monitor.id}` })
      })
      this.isProjected = false
    },
    async projectWindows(){
      const monitors = await this.getMonitors()
      const monitorsConfig = await this.getMonitorsConfig()
      monitors.forEach(monitor => {
        var config = monitorsConfig.filter(monitorConfig => monitorConfig.name == monitor.name)[0]
        if(config){
          config.isProjector ? invoke('create_window', { windowLabel: `external_${config.id}`, title: "Projector Window", url: "/#/presentation_view", fullscreen: config.isFullscreen, x: config.position.x, y: config.position.y }) : null
        }
      })
      this.isProjected = true
    }
  },
};
</script>
<style>
</style>