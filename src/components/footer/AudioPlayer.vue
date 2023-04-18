<template>
  <div class="flex flex-col h-24 bg-white dark:bg-winter-950">
    <input
      type="range"
      min="0"
      max="100"
      step=".01"
      class="progress transition-all duration-300"
      v-model="progress"
      @input="updateProgress"
      :style="{ backgroundSize: progressBackground }"
    />
    <div class="grid grid-cols-3 h-22">
      <div class="flex justify-between items-center p-2 col-span-2">
        <h3 class="font-medium text-lg select-none w-1/2 whitespace-nowrap text-ellipsis overflow-clip text-zinc-900 dark:text-zinc-100">{{ currentMusic.name }}</h3>
        <div class="flex space-x-3 p-2">
          <!--Play buttons-->
          <button @click="previous" class="focus:outline-none text-zinc-700 hover:text-black">
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button @click="()=>isPlaying=!isPlaying"
            class="rounded-full w-10 h-10 flex items-center justify-center pl-1 ring-2  focus:outline-none ring-gray-100 hover:ring-gray-200 text-zinc-700 hover:text-black"
          >
            <svg v-if="!isPlaying"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 pr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>

          </button>
          <button @click="next" class="focus:outline-none text-zinc-700 hover:text-black">
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
        <div class="w-32 mr-2">
          <input type="range" min="0" max="100" step="1" class="volume rounded-full transition-all duration-300" v-model="volume" @input="updateVolume" :style="{ backgroundSize: volumeBackground }"/>
        </div>
      </div>
      <ul
        class="text-xs divide-y divide-zinc-300 dark:divide-black border-l border-zinc-300 dark:border-black cursor-default h-22 overflow-scroll no-scrollbar"
      >
        <li v-for="music in musicList" :key="music.name" @click="()=>{index=music.index}" class="flex items-center space-x-3 h-10 hover:bg-stone-100 hover:dark:bg-zinc-800">
          <button :class="[{'dark:bg-tree-frog-600 bg-tree-frog-500': currentMusic.name == music.name}]" class="p-3 h-10 hover:bg-bluejay-400 hover:dark:bg-bluejay-600 group focus:outline-none">
            <svg
              class="w-4 h-4 group-hover:text-white dark:text-zinc-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <p class="flex-1 p-2 text-sm select-none text-zinc-800 hover:text-black dark:text-zinc-200 hover:dark:text-white text-ellipsis whitespace-nowrap overflow-clip">{{ music.name }}</p>
          <p class="text-xs select-none text-zinc-600 dark:text-zinc-400 p-3">{{ music.duration }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Howl, Howler} from 'howler';
import { readDir, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event'
import allowedExtensions from './allowedMusicExtensions.json'
export default {
  name: "AudioPlayer",
  data() {
    return {
      progress: 0,
      progressBackground: "0% 100%",
      volume: 20,
      volumeBackground: "20% 100%",
      config: null,
      musicList: [],
      music: null,
      index: 0,
      reloadListener: null,
      updaterUI: null,
      isPlaying: false
    };
  },
  methods: {
    async load(){
      this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
      var i=0; let musicList =(await readDir(this.config.backgroundMusicPath)).map(element=>{ //Indexes the files and separetes the extensions
        const lastDot = element.name.lastIndexOf('.');
        const before = element.name.slice(0, lastDot);
        const after = element.name.slice(lastDot + 1);
        return {
          index: i++,
          name: before,
          extension: after,
          path: element.path
        }
      })
      musicList = musicList.filter(element=>allowedExtensions.includes(element.extension)) //Filters out not wanted extensions
      this.musicList = musicList.map(music=>{
        let url = convertFileSrc(music.path)
        let sound = new Howl({src: [url]});
        return {
          index: music.index,
          name: music.name,
          extension: music.extension,
          path: music.path,
          url: url,
          duration: this.durationString(sound.duration())
        }
      })
    },
    async playMusic(music){
      if(this.music){
        this.music.stop()
      }
      this.music = new Howl({
        src: [music.url],
        autoplay: this.isPlaying,
        loop: true,
        volume: 0.1,
        onend: function() {
          this.next();
        },
      });
    },
    previous() {
      if(this.index == 0){
        this.index = this.musicList.length - 1;
        return
      }
      this.index--;
    },
    next() {
      if(this.index == this.musicList.length - 1){
        this.index = 0;
        return
      }
      this.index++;
    },
    updateUI(){
      if(this.music){
        this.progress = this.music.seek() / this.music.duration() * 100
        this.progressBackground = this.progress + "% 100%"
      }
    },
    updateProgress(e) {
      if(this.music){
        if(this.progress == 100){
          this.next()
        }
        let clickedElement = e.target,
          min = clickedElement.min,
          max = clickedElement.max;
        this.progressBackground = ((this.progress - min) * 100) / (max - min) + "% 100%";
        this.music.seek(this.music.duration() * (this.progress / 100))
      }
    },
    updateVolume(e) {
      let clickedElement = e.target,
        min = clickedElement.min,
        max = clickedElement.max,
        val = clickedElement.value;
      let percentage = ((val - min) * 100) / (max - min);
      this.volumeBackground = percentage + "% 100%";
      if(this.music){
        this.music.volume((percentage / 100).toFixed(1))
      }
    },
    async listen(){
      this.reloadListener = await listen('reload-music', (event) => {
        this.load()
      })
    },
    durationString(seconds){
      var str = `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`
      if(seconds > 3600){
        str = `${Math.floor(seconds/3600)}:${String(Math.floor((seconds % 3600)/60)).padStart(2,'0')}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`
      }
      return str
    }
  },
  computed: {
    currentMusic() {
      if(this.musicList.length > 0){
        return this.musicList[this.index];
      }
      return {
        name: "No music found"
      }
    },
  },
  watch: {
    'isPlaying': function(isPlaying){
      if(!this.music){
        this.playMusic(this.musicList[this.index])
      }
      if(isPlaying){
        this.music.play()
      }else{
        this.music.pause()
      }
    },
    'index': function (index) {
      this.isPlaying = true
      this.playMusic(this.musicList[index],this.isPlaying)
    },
  },
  mounted() {
    setInterval(() => {
      this.updateUI()
    }, 1000)
    this.listen()
    this.load()
  },
  beforeUnmount(){
    if(this.music){
      this.music.stop()
    }
  }
};
</script>

<style>
/* Slider CSS */
input.volume[type="range"] {
  -webkit-appearance: none;
  display: block;
  width: 100%;
  background: #383838;
  background-image: -webkit-linear-gradient(left, #64a9f6 0%, #64a9f6 100%);
  background-repeat: no-repeat;
}
input.progress[type="range"] {
  -webkit-appearance: none;
  display: block;
  width: 100%;
  background: #383838;
  background-image: -webkit-linear-gradient(left, #3f88f2 0%, #3f88f2 100%);
  background-repeat: no-repeat;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0px;
  border: none;
}
input[type="range"]::-webkit-slider-thumb {
  height: 16px;
  width: 16px;
  border-radius: 2px;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent;
}
</style>