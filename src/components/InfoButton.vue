<template>
  <div>
    <button
      type="button"
      @click="showInfo"
      class="text-sm group h-12 w-12 rounded-lg p-2.5 
        text-neutral-800 dark:text-zinc-200 
        hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md 
        hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-800 dark:text-zinc-200">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  mounted() {
  },
  methods: {
    showInfo(){
      console.log("Info!!")
    }
  },
};
</script>
<style>
</style>