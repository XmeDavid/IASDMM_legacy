<template>
    <div class="flex flex-row no-scrollbar">
        <div class="w-64 flex flex-col p-2 z-30 shadow-lg shadow-black dark:shadow-zinc-600 flex-shrink-0">
            <div class="flex flex-row items-center pl-2 pr-2 relative transition-all duration-300">
                <span class="w-60 text-sm text-zinc-700 dark:text-zinc-400 whitespace-nowrap select-none"> As Minhas Apresentações</span>
                <div class="grow"></div>
                <button @click="()=>{_createPresentationToggle = !_createPresentationToggle}" class="p-2 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                    <svg :class="[{'': !_createPresentationToggle, 'rotate-45': _createPresentationToggle}]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-300 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <hr class="my-1">
            <div :class="['transition-max  duration-300 overflow-hidden', {'h-0': !_createPresentationToggle, 'h-16': _createPresentationToggle}]">
                <div class="relative z-0">
                    <input type="text" id="floating_standard" class="mt-2 block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 select-none">Nova Apresentação</label>
                    <button @click="()=>{_createPresentationToggle = !_createPresentationToggle}" class="absolute z-50 top-0 right-2 p-2 rounded-lg transition duration-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-75 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div :class="[_createPresentationToggle ? 'program-div-open': 'program-div-close']" class="overflow-scroll no-scrollbar p-1">
                <li
                    v-for="presentation in presentations" :key="presentation.id"
                    @click="selectPresentation(presentation)"
                    :class="{['shadow-sm shadow-bluejay-600']: presentation.selected}"
                    class="z-10 mb-2 flex items-center text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
                >
                    <span
                    class="ml-3 m-2 transition duration-75 text-zinc-700 dark:text-zinc-200 font-medium select-none"
                    >{{ presentation.name }}</span>
                    <span class="grow"></span>
                    <button @click.stop="deletePresentation(presentation)" class="p-2 group rounded-lg z-20 hover:shadow-inner dark:hover:shadow-scarlett-700 hover:shadow-scarlett-200 hover:bg-scarlett-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-600 dark:text-zinc-300 group-hover:text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    
                </li>
            </div>
        </div>
        <div class="w-full h-full p-4 overflow-hidden" v-if="selectedPresentation != undefined" >
            <!--button @click="send">TitleScreen!!!!!!!!!</button-->
            <div class="flex flex-row">
                <h1  class="sm:text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-800 dark:text-zinc-100">{{selectedPresentation.name}}</h1>
                <span class="grow"></span>
                <button @click="newSlide" class="p-2 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-300 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <Slide v-for="slide in selectedPresentation.slides" :key="slide.id" :slide="slide"/>
        </div>
        
    </div>
</template>
<script>
import Slide from "./Slide.vue"
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api/tauri'
export default {
    components: {
        Slide
    },
    data(){
        return {
            config: null,
            presentations: [],
            _createPresentationToggle: false

        }
    },
    computed: {
        selectedPresentation(){
            return this.presentations.find(p => p.selected == true)
        }
    },
    methods: {
        newSlide(){
            console.log("Heyyy!!")
        },
        selectPresentation(presentation){
            this.presentations.forEach(p => p.selected == true ? p.selected = false : null)
            presentation.selected = !presentation.selected
        },
        deletePresentation(presentation){
            console.log(presentation)
        },
        async load(){
            this.config = JSON.parse(await readTextFile('app.conf', { dir: BaseDirectory.AppData }))
            this.presentations = this.config.presentations
        },
        async save(){
            this.config.presentations = this.presentations
            let json_str = JSON.stringify(this.config)
            await writeTextFile('app.conf', json_str, { dir: BaseDirectory.AppData })
        }
    },
    mounted(){
        this.load()
    },
    beforeUnmount(){
        this.save()
    }
}
</script>
<!-- 
    This is awful, but apparently, the h-full is not working properly, so it needs to be done, 
    basically, it calculates the vh, whioch is the value the h-full is defaulting for some reason, 
    and subtracts the size of the elements above and below, those values are hardcoded, but it works
    the transition is to match the other transition on the create
-->
<style scoped>
.program-div-close{
    height: calc(100vh - 96px - 81px);
    transition: 300ms;
}

.program-div-open{
    height: calc(100vh - 96px - 145px);
    transition: 300ms;
}
</style>