<template>
  <div>
    <button
      type="button"
      @click="toggleWindows"
      class="text-sm group h-12 w-12 rounded-lg p-2.5 
        text-neutral-800 dark:text-zinc-200 
        hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md 
        hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-800 dark:text-zinc-200">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  mounted() {
  },
  methods: {
    toggleWindows(){
      console.log("Windows!!")
    }
  },
};
</script>
<style>
</style>