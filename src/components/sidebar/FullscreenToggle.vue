<template>
  <div>
    <button
      type="button"
      @click="fullscreenToggle"
      :class="{
        'bg-bluejay-600 hover:bg-bluejay-500': isFullscreen,
        'hover:bg-gray-100 dark:hover:bg-zinc-800  ': !isFullscreen
      }"
      class="text-sm group h-12 w-12 rounded-lg p-2.5 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
    >
      <svg :class="{
        'text-white': isFullscreen,
        'text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white': !isFullscreen
      }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
      </svg>

    </button>
  </div>
</template>
<script>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri'
export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    async fullscreenToggle(){
      this.isFullscreen = !this.isFullscreen
      await invoke('set_window_fullscreen', { fullscreen: this.isFullscreen })
    },
  },
};
</script>
<style>
</style>