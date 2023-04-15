<template lang="">
    <div class="">
        <hr>
        <div class="grid grid-cols-3">
            <div class="p-1 pt-5   relative">
                <label for="old-hymnal-edit" class="absolute text-xs top-1 left-2 text-zinc-600 dark:text-zinc-400">Titulo do Slide</label>
                <input type="text" v-model="data.title" id="old-hymnal-edit" class="block w-full p-1 rounded-lg font-normal text-lg text-black dark:text-zinc-200 bg-neutral-200 dark:bg-zinc-800 placeholder-neutral-600 dark:placeholder-zinc-400 bg-opacity-50 dark:bg-opacity-80" placeholder="Título do Slide" required>
            </div>
            <div class="p-1 pt-5 col-span-2 relative">
                <label for="old-hymnal-edit" class="absolute text-xs top-1 left-2 text-zinc-600 dark:text-zinc-400">Subtítulo do Slide</label>
                <input type="text" v-model="data.subTitle" id="old-hymnal-edit" class="block w-full p-1 rounded-lg font-normal text-lg text-black dark:text-zinc-200 bg-neutral-200 dark:bg-zinc-800 placeholder-neutral-600 dark:placeholder-zinc-400 bg-opacity-50 dark:bg-opacity-80" placeholder="Subtítulo do Slide" required>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: "OldHymnalEdit",
    props: {
        data:{
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            title: "Hey",
            subtitle: "Onit"
        }
    },
    mounted(){
        console.log(this.data)
    }
}
</script>
<style lang="">
    
</style>