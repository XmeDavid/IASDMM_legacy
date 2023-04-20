<template>
  <div>
    <button
      type="button"
      @click="toggleWindows"
      :class="{
        'bg-bluejay-600 hover:bg-bluejay-500': isProjected,
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
      monitorsProjecting: [],
      isProjected: false
    };
  },
  mounted() {
  },
  methods: {
    async toggleWindows(){
      if(this.isProjected){
        this.closeWindows()
      }else{
        this.projectWindows()
      }
    },
    async projectWindows(){
      //Get monitor config previously saved to disk
      const monitorsConfig = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData })).monitors

      //Get currently avalible monitors
      const regex = /[^a-zA-Z0-9]+/g; //Regex to make sure the labels created with the monitor name are valid
      const monitors = (await availableMonitors()).map(monitor => {
        return {
            name: monitor.name.replaceAll(regex,''),
            scaleFactor: monitor.scaleFactor,
            size: monitor.size,
            position: monitor.position,
            isProjector: false,
            isFullscreen: false,
          }
      });
      /**
       * Explanation for the following code, its indented the same way the code bellow:
       * For each avalible monitor
       *    Check if that monitor is configured
       *    If it is,
       *        And the configuration is to be projector, create window
       *        Save that monitor label to delete close the window later
       *        Set isProjected to true
       */
      monitors.forEach(monitor => {
        var config = monitorsConfig.filter(monitorConfig => monitorConfig.name == monitor.name)[0]
        if(config){
          config.isProjector ? invoke('create_window', { windowLabel: `external_${config.name}`, title: "Projector Window", url: "/#/presentation_view", fullscreen: true, sizeX: config.size.width,  sizeY: config.size.height,  x: config.position.x, y: config.position.y }) : null
          this.monitorsProjecting.push(`external_${config.name}`)
          this.isProjected = true //at least one monitor needs to be projected for the toggle to work, else, nothing should happen and user should go to settings
        }
      })
    },
    async closeWindows(){
      this.monitorsProjecting.forEach(label => {
        invoke('close_window', { windowLabel: label })
      })
      this.isProjected = false
    }
  },
};
</script>
<style>
</style>