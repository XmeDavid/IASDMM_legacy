<template>
  <div>
    <button
      type="button"
      @click="switchTheme"
      class="text-sm group h-12 w-12 rounded-lg p-2.5 
        text-neutral-800 dark:text-zinc-200 
        hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md 
        hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-800 block dark:hidden">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-200 dark:block hidden">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>

    </button>
  </div>
</template>
<script>
export default {
  mounted() {
    //this.switchTheme()
  },
  methods: {
    switchTheme(){
        if(localStorage.theme == undefined){
            localStorage.theme = 'light'
        }else if(localStorage.theme == 'dark'){
            localStorage.theme = 'light'
        }else if(localStorage.theme == 'light'){
            localStorage.theme = 'dark'
        }
        
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
  },
};
</script>
<style>
</style>