<template>
  <div>
    <div v-if="!isPresentationView && !isNoteView" class="flex flex-row dark:bg-zinc-900 bg-zinc-50 w-screen">
      <SideMenu class="z-50"/>
      <div class="flex flex-col h-screen w-full">
        <router-view class="max-h-full grow w-full z-0"></router-view>
        <AudioPlayer class="z-40"/>
      </div>
    </div>
    <div v-if="isPresentationView" >
        <router-view class="w-screen h-screen"></router-view>
    </div>
    <div v-if="isNoteView" class="w-screen h-screen">
        <h1>Notes here</h1>
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/sidebar/SideMenu.vue";
import AudioPlayer from "./components/footer/AudioPlayer.vue";
import PresentationView from "./PresentationView.vue";


import { exists, createDir, readDir, writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
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
    async appConf(){
      // Load config from file
      // Read the text file in the `$APPCONFIG/app.conf` path
      //await createDir('iasd', { dir: BaseDirectory.AppLocalData, recursive: true });
      //const entries = await readDir('iasd', { dir: BaseDirectory.AppLocalData, recursive: true });
      //console.log(entries);
      //console.log(BaseDirectory.AppLocalData)
      //await writeTextFile('app.conf', 'file contents', { dir: BaseDirectory.AppData })
      //const contents = await readTextFile('app.conf', { dir: BaseDirectory.AppData });
      //console.log(contents);
      if(!(await exists('app.conf', { dir: BaseDirectory.AppData }))){
        console.log('No app.conf file found, creating...')
        const sampleConfig = {
          "backgroundMusicPath": "",
          "monitors": [],
          "presentations": [] 
        }
        await createDir('', { dir: BaseDirectory.AppData, recursive: true });
        await writeTextFile('app.conf', JSON.stringify(sampleConfig), { dir: BaseDirectory.AppConfig });
      }
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
    this.appConf()
  }
}
</script>

<style scoped>
</style>
