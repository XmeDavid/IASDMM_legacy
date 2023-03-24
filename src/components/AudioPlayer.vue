<template>
  <div class="flex flex-col">
    <p class="m-1 dark:text-slate-200 text-black truncate">{{musicName}}</p>

    <input id="progressBar" type="range" v-model="currentMusicProgress" @change="changeProgress" class="m-1 appearance-none h-4 w-full rounded-sm overflow-hidden bg-zinc-200 shadow-inner shadow-zinc-400  dark:bg-zinc-700 dark:shadow-zinc-800"/>

    <div class="flex flex-row items-center justify-between m-1">
      <button @click="previous" class="h-8 w-8 m-1 rounded-full bg-c-bluejay opacity-70 hover:opacity-100 flex flex-row items-center shadow-sm shadow-black">
        <div class="w-2"></div>
        <svg class="h-4 w-4 fill-white" viewBox="0 0 512 512"><path d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"/></svg>
      </button>
      <button @click="playPause" class="h-12 w-12 m-1 rounded-full bg-c-bluejay opacity-70 hover:opacity-100 items-center shadow-sm shadow-black">
        <svg v-if="!isPlaying" viewBox="0 0 512 512" class="h-10 w-10 pl-4 fill-white">
          <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/>
        </svg>
        <svg v-if="isPlaying" viewBox="0 0 512 512" class="h-10 w-10 pl-4 fill-white">
          <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/>
        </svg>
      </button>
      
      <button @click="next" class="h-8 w-8 m-1 rounded-full bg-c-bluejay opacity-70 hover:opacity-100 flex flex-row items-center shadow-sm shadow-black">
        <div class="w-2"></div>
        <svg class="h-4 w-4 fill-white" viewBox="0 0 512 512"><path d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z"/></svg>
      </button>
    </div>
    <div class="flex flex-row items-center justify-between">
      <div></div>
      <button @click="stop" class="h-6 w-6 m-1 rounded-full bg-c-bluejay opacity-70 hover:opacity-100 flex flex-row items-center shadow-sm shadow-black">
        <div class="w-1"></div>
        <svg class="h-4 w-4 fill-white" viewBox="0 0 384 512"><path d="M384 128v255.1c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V128c0-35.35 28.65-64 64-64H320C355.3 64 384 92.65 384 128z"/></svg>
        </button>
        <div></div>
    </div>
    <div class="h-2"></div>
    <input type="range" class="rounded-lg  appearance-none bg-slate-300 h-1 accent-c-bluejay-light m-1" v-model="volume" @change="changeVolume">
    <!--source v-for="music in index" :key="music.id" :src="`../assets/music/background/${music.id}.mp3`" type="audio/mpeg"-->
  </div>
</template>

<script>
import {Howl, Howler} from 'howler';
import index from "../assets/music/background/index.json"
export default {
  data(){
    return {
      selectedMusic: 1,
      volume: 50,
      music: null,
      isPlaying: false,
      currentMusicProgress: 0,
      updateProgressBarInterval: null,
    }
  },
  methods:{
    load(){
      this.music = new Howl({
        src: [`src/assets/music/background/${this.selectedMusic}.mp3`],
        onend: this.next
      });
    },
    playPause(){
      if(this.music == null){
        this.load()
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
      if(this.selectedMusic == index.length){
        this.selectedMusic = 1
      }
      this.music.stop()
      this.load()
      this.currentMusicProgress = 0
      if(this.isPlaying){
        this.play()
      }
    },
    previous(){
      this.selectedMusic--
      if(this.selectedMusic == 0){
        this.selectedMusic = index.length
      }
      this.music.stop()
      this.load()
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
    }
  },
  computed: {
    musicName(){
      return index[this.selectedMusic-1].name
    },
  },
  mounted(){
    this.load()
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
      box-shadow: -200px 0 0 200px #2e6de7;
    }
</style>