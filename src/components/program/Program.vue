<template>
    <div class="flex flex-row">
        <div class="!w-64  p-2 z-30 shadow-lg shadow-black dark:shadow-zinc-600 flex-shrink-0">
            <div class="flex flex-row items-center pl-2 pr-2 relative transition-all duration-300">
                <span class="w-60 text-sm text-zinc-700 dark:text-zinc-400 whitespace-nowrap"> As Minhas Apresentações</span>
                <div class="grow"></div>
                <button @click="()=>{_createPresentationToggle = !_createPresentationToggle}" class="p-2 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700">
                    <!--svg :class="['transition-max duration-300 overflow-hidden', {'': !_createPresentationToggle, 'hidden': _createPresentationToggle}]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-75 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <svg :class="['transition-max duration-300 overflow-hidden', {'hidden': !_createPresentationToggle, '': _createPresentationToggle}]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-75 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg-->
                    <svg :class="[{'': !_createPresentationToggle, 'rotate-45': _createPresentationToggle}]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-300 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <hr class="my-1">
            <div :class="['transition-max  duration-300 overflow-hidden', {'h-0': !_createPresentationToggle, 'h-16': _createPresentationToggle}]">
                <div class="relative z-0">
                    <input type="text" id="floating_standard" class="mt-2 block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nova Apresentação</label>
                    <button @click="()=>{_createPresentationToggle = !_createPresentationToggle}" class="absolute z-50 top-4 right-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition duration-75 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
            <li
                v-for="presentation in presentations"
                @click="selectPresentation(presentation)"
                :class="{['shadow-sm shadow-c-bluejay']: presentation.selected}"
                class="mb-2 group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
                <span
                class="ml-3 transition duration-75 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white"
                >{{ presentation.name }}</span>
            </li>
        </div>
        <div class="w-full">
            <button @click="send">TitleScreen</button>
        </div>
        
    </div>
</template>
<script>
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api/tauri'
export default {
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
        selectPresentation(presentation){
            this.presentations.forEach(p => p.selected == true ? p.selected = false : null)
            presentation.selected = !presentation.selected
        },
        async send() {
            await invoke('send_data', { data: JSON.stringify({
                routeName: 'TitleView',
                data: {
                    title: 'IASD',
                    subTitle: 'Gandara dos Olivais',
                    color: 'This is a hymn'
                }
            }), windowLabel: 'external_0'})
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
<style>
    
</style>