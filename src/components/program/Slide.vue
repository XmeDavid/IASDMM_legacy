<template lang="">
    <div class="p-2 my-2 rounded-lg border-2 transition-all duration-300">
        <div class="flex flex-row items-center p-2">
            <h1 :class="[{'hidden': editable}]" class="select-none text-2xl text-center">{{slide.title}}</h1>
            <input type="text" :class="[{'hidden': !editable}]" class="mr-2 block w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" v-model="slide.title"/>
            <div class="grow"></div>

            <div @click="() => typeEditable = !typeEditable" class="group relative p-2 rounded-lg transition duration-100 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                <h2 disabled class="select-none w-32 text-ellipsis appearance-none bg-transparent text-center font-medium transition duration-300 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white"> {{ getName(slide.type) }} </h2>
                <div class="hidden group-hover:block py-2 px-3 w-32 absolute rounded-lg border transition duration-100 bg-zinc-100 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                <h3 @click="()=>{slide.type = item.slideType}" v-for="(item, index) in slideTypes" class="select-none p-1 whitespace-nowrap font-normal text-center hover:drop-shadow hover:font-bold rounded-lg"> {{ item.name }} </h3>
                </div>
            </div>

            <button @click="toggleEdit"
            class="aspect-square p-2 rounded-lg transition duration-75  hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            :class="[{'hover:bg-gray-100 dark:hover:bg-zinc-800' : !editable, 'bg-bluejay-600 hover:bg-bluejay-500' : editable}]"
            >
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 " 
                :class="[{'text-black dark:text-white' : !editable, 'text-white' : editable}]"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button @click="startSlide"
            class="aspect-square p-2 rounded-lg transition duration-75  hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            :class="[{'hover:bg-gray-100 dark:hover:bg-zinc-800' : !presenting, 'bg-bluejay-600 hover:bg-bluejay-500' : presenting}]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 " 
                :class="[{'text-black dark:text-white' : !presenting, 'text-white' : presenting}]"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
            </button>
            <div class="grid grid-rows-2">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </div>
        <OldHymnalEdit :class="[`transition-max  duration-300 overflow-hidden h-${hSize}`]" :data="slide.data"/>
    </div>
</template>
<script>//{'h-0': !editable}, {editableSize: editable}
import editableSizes from './editables/slideTypesInfo.json'
import OldHymnalEdit from './editables/OldHymnalEdit.vue'
import { invoke } from '@tauri-apps/api/tauri'
export default {
    name: "Slide",
    components: {
        OldHymnalEdit
    },
    props: {
        slide:{
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            editable: false,
            typeEditable:false,
            presenting: false,
        }
    },
    methods: {
        toggleEdit(){
            this.editable = !this.editable
        },
        startSlide(){
            this.presenting = !this.presenting
            this.presenting ? this.sendToPresenter() : null
        },
        async sendToPresenter() {
            await invoke('send_data', { data: JSON.stringify({
                routeName: this.slide.type,
                data: this.slide.data
            }), windowLabel: 'external_0'})
        },
        moveUp(){ ///Emit event to parent, telling them to move this slide up

        },
        moveDown(){ ///Emit event to parent, telling them to move this slide down

        },
        getName(type){
            return editableSizes.find(slide => slide.slideType === type).name
        }
    },
    computed: {
        hSize(){
            if(this.editable){
                return editableSizes.find(slide => slide.slideType === this.slide.type).h
            }
            return '0'
        },
        slideTypes(){
            return editableSizes
        }
    },
    mounted(){
    }
}
</script>
<style lang="">
    
</style>