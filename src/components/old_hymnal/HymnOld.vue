<template>
    <div class="w-full h-full grid place-items-center p-8 bg-cover bg-[url('src/assets/img/old_hymnal_bg.png')]">
            <div class="flex flex-col h-[74vh] w-[90%] border rounded-xl bg-zinc-200 dark:bg-black bg-opacity-40 dark:bg-opacity-40">
                <div class="flex flex-row h-16">
                    <div class="p-2 m-2">
                        <span class="font-bold text-zinc-800 dark:text-zinc-300 select-none">Procurar</span>
                    </div>
                    <div class="grow"></div>
                    <router-link to="/hymn_new" class="group p-2 m-2 rounded-lg hover:bg-opacity-70 hover:dark:bg-opacity-70 hover:bg-neutral-200 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                        <span class="font-bold transition duration-75 text-zinc-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white select-none">Mudar para o Hinário Novo</span>
                    </router-link>
                </div>
            
                <div class="relative p-2 ">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 m-2 text-gray-500 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" v-model="userInput" id="hymn-search" class="block w-full p-4 pl-10 rounded-lg font-semibold text-lg text-black dark:text-zinc-200 bg-neutral-200 dark:bg-zinc-800 placeholder-neutral-600 dark:placeholder-zinc-400 bg-opacity-50 dark:bg-opacity-80" placeholder="Nome ou numero do hino" required>
                </div>
                <div class="overflow-y-scroll h-full no-scrollbar">
                    <HymnLine v-for="hymn in hymnList" :key="hymn._id" :hymn="hymn"/>
                </div>
            </div>
    </div>
</template>
<script>
import HymnLine from './HymnLine.vue'
import indexFile from '../../assets/json/index.json'
export default {
    components:{
        HymnLine
    },
    data(){
      return {
        userInput: "",
      }
    },
    methods: {
        hasWords(toCheck){
          var validWords = true
          var _words = this.userInput.toLowerCase().split(" ").filter((element)=>{
            return element != ""
          })
          _words.forEach((element)=>{
            if(!toCheck.includes(element)){
              validWords = false
            }
          })
          return validWords
        }
    },
    computed: {
      hymnList(){ 
        return indexFile.filter((element)=>{
          return element.number == this.userInput || element._id == this.userInput || this.hasWords(element.name.toLowerCase())
        })
      }
    },
}
</script>
<style>
</style>