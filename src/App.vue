<template>
  <div class="flex flex-row dark:bg-zinc-900 bg-zinc-50 w-screen">
    <SideMenu class="z-50"/>
    <div class="flex flex-col h-screen w-full">
      <router-view class="h-full w-full"></router-view>
      <AudioPlayer/>
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/sidebar/SideMenu.vue";
import AudioPlayer from "./components/footer/AudioPlayer.vue";


import { createDir, readDir, writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
export default {
  name: "App",
  components: {
    SideMenu,
    AudioPlayer
  },
  data(){
    return {
    }
  },
  methods: {
    async loadConfig(){
      // Load config from file
      // Read the text file in the `$APPCONFIG/app.conf` path
      //await createDir('iasd', { dir: BaseDirectory.AppLocalData, recursive: true });
      //const entries = await readDir('iasd', { dir: BaseDirectory.AppLocalData, recursive: true });
      //console.log(entries);
      //console.log(BaseDirectory.AppLocalData)
      //await writeTextFile('app.conf', 'file contents', { dir: BaseDirectory.AppData })
      //const contents = await readTextFile('app.conf', { dir: BaseDirectory.AppData });
      //console.log(contents);
    },
  },
  computed:{
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>
