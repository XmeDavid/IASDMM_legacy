<template lang="">
    <div class="relative">
        <div class="absolute w-screen h-screen z-10">
            <div class="flex flex-col h-screen items-center">
                <span class="h-1/6"></span>
                <img :src="logoPath" alt="Presentation Image" class="object-contain h-2/5">
                <span class="grow"></span>
                <div :class="[`bg-${color}`]" class=" p-12">
                    <h1 class="text-9xl font-semibold text-white text-shad z-20">{{data.text}}</h1>
                </div>
                
                <span class="h-1/6"></span>
            </div>
            
        </div>
        <img :src="bgPath" alt="Presentation Image" class="absolute z-0 top-0 h-screen w-screen object-cover">
    </div>
</template>
<script>
import { emit, listen } from '@tauri-apps/api/event'
import { convertFileSrc } from '@tauri-apps/api/tauri';
export default {
    data() {
        return {
            listener: null,
            data: null,
            bgPath: null,
            logoPath: null
        }
    },
    methods: {
        async listen() {
            this.listener = await listen('presentation-data', (event) => {
                let data = JSON.parse(event.payload.data)
                this.$router.push({
                    name: data.routeName,
                    params: {data: JSON.stringify(data.data)}
                })
            })
        }
    },
    computed: {
        color(){
            if(this.data){
                return this.data.color
            }else{
                return 'bluejay-700'
            }
        }
    },
    mounted() {
        this.listen()
    },
    created() {
        this.data = JSON.parse(this.$router.currentRoute.value.params.data)
        console.log(this.data)
        this.bgPath = convertFileSrc(this.data.bgPath)
        this.logoPath = convertFileSrc(this.data.logoPath)
    }
}
</script>
<style lang="">
    
</style>