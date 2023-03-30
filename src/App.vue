<template>
  <div v-if="!isPresentationView && !isNoteView" class="flex flex-row dark:bg-zinc-900 bg-zinc-50 w-screen">
    <SideMenu class="z-50"/>
    <div class="flex flex-col h-screen w-full">
      <router-view class="h-full w-full"></router-view>
      <AudioPlayer/>
    </div>
  </div>
  <div v-if="isPresentationView" >
      <router-view class="w-screen h-screen"></router-view>
  </div>
  <div v-if="isNoteView" class="w-screen h-screen">
      <h1>Notes here</h1>
  </div>
</template>

<script>
import SideMenu from "./components/sidebar/SideMenu.vue";
import AudioPlayer from "./components/footer/AudioPlayer.vue";
import PresentationView from "./PresentationView.vue";


import { createDir, readDir, writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
export default {
  name: "App",
  components: {
    PresentationView,
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
    isPresentationView(){
      return window.location.href.includes('/presentation_view')
    },
    isNoteView(){
      return window.location.href.includes('/note_view')
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>
