<template>
  <footer class="grid grid-rows-2 p-4 shadow-xl shadow-black dark:shadow-zinc-100 bg-zinc-50 dark:bg-zinc-900">

    <div class="flex flex-row items-center justify-between relative">
      
      <p class="w-3/8 dark:text-slate-200 text-black truncate select-none">{{ musicName }}</p>

      <div class="w-48 flex flex-row absolute left-1/2 -translate-x-1/2">
      <span @click="previous">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 opacity-70 hover:opacity-100 text-zinc-800 dark:text-zinc-200 hover:dark:text-white hover:text-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
        </svg>
      </span>

      <span @click="playPause">
        <svg :class="{'hidden' : isPlaying}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 opacity-70 hover:opacity-100 text-zinc-800 dark:text-zinc-200 hover:dark:text-white hover:text-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>

        <svg :class="{'hidden' : !isPlaying}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 opacity-70 hover:opacity-100 text-zinc-800 dark:text-zinc-200 hover:dark:text-white hover:text-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
        </svg>
      </span>

      <span @click="next" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 opacity-70 hover:opacity-100 text-zinc-800 dark:text-zinc-200 hover:dark:text-white hover:text-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
        </svg>
      </span>
      </div>


      <input type="range" class="appearance-none h-1 w-48 rounded-lg accent-bluejay-600  bg-zinc-300 dark:bg-zinc-700 shadow-inner" v-model="volume" @change="changeVolume">
      
    </div>
    
    <input id="progressBar" type="range" v-model="currentMusicProgress" @change="changeProgress" class="appearance-none mt-4 h-4 w-full rounded-sm overflow-hidden bg-zinc-200 shadow-inner shadow-zinc-400  dark:bg-zinc-700 dark:shadow-zinc-800"/>
  
  </footer>
</template>

<script>
import {Howl, Howler} from 'howler';
import { readDir, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { emit, listen } from '@tauri-apps/api/event'
export default {
  data(){
    return {
      selectedMusic: 0,
      volume: 50,
      music: null,
      isPlaying: false,
      currentMusicProgress: 0,
      updateProgressBarInterval: null,
      musicList: [],
      listener: null,
    }
  },
  methods:{
    async load(){
      if(this.music != null){
        this.music.stop()
      }
      this.selectedMusic = 0
      this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
      let path = this.config.backgroundMusicPath
      var i = 0;
      this.musicList = (await readDir(path)).map(element=>{
        element.id = i++
        return element
      })
      this.isPlaying = false
      this.loadMusic()
    },
    loadMusic(){
      let _music = this.musicList.find(element => element.id == this.selectedMusic)
      let musicURL = convertFileSrc(_music.path)
      console.log(musicURL)
      this.music = new Howl({
        src: [musicURL],
        onend: this.next
      });
    },
    playPause(){
      if(this.music == null){
        this.loadMusic()
      }
      this.isPlaying = !this.isPlaying
      if(this.isPlaying){
        this.play()
      }else{
        this.clearProgressInterval()
        this.music.pause()
      }
    },
    play(){
      this.clearProgressInterval()
      this.updateProgressBarInterval = setInterval(()=>{
        this.currentMusicProgress = (this.music.seek()/this.music.duration())*100
      }, this.music.duration()*10);
      this.music.play()
    },
    stop(){
      this.isPlaying = false
      this.currentMusicProgress = 0
      this.music.stop()
    },
    changeVolume(){
      var v = this.volume / 100
      this.music.volume(v)
    },
    next(){
      this.selectedMusic++
      if(this.selectedMusic == musicList.length){
        this.selectedMusic = 1
      }
      this.music.stop()
      this.loadMusic()
      this.currentMusicProgress = 0
      if(this.isPlaying){
        this.play()
      }
    },
    previous(){
      this.selectedMusic--
      if(this.selectedMusic == 0){
        this.selectedMusic = musicList.length
      }
      this.music.stop()
      this.loadMusic()
      this.currentMusicProgress = 0
      if(this.isPlaying){
        this.play()
      }
    },
    changeProgress(){
      if(this.currentMusicProgress == 100){
        this.next()
        return
      }
      this.music.seek(this.music.duration()*(this.currentMusicProgress/100))
    },
    clearProgressInterval(){
      if(this.updateProgressBarInterval != null){
        clearInterval(this.updateProgressBarInterval)
        this.updateProgressBarInterval = null
      }
    },
    async listen() {
            this.listener = await listen('reload-music', (event) => {
                this.load()
            })
        }
  },
  computed: {
    musicName(){
      if(this.musicList == undefined){
        console.log("Erorr!")
        return "Nothing Playing..."
      }
      let _music = this.musicList.find(e => e.id == this.selectedMusic)
      if(_music == undefined || _music == null){
        return "Nothing Playing..."
      } 
      console.log(_music)
      return _music.name
    },
  },
  mounted(){
    this.load()
    this.listen()
  }
}
</script>

<style>
    #progressBar::-webkit-slider-runnable-track {
      color: #2e6de7;
    }
    
    #progressBar::-webkit-slider-thumb {
      width: 10px;
      -webkit-appearance: none;
      cursor: ew-resize;
      background: #2e6de7;
      box-shadow: -2000px 0 0 2000px #2e6de7;
    }
</style>