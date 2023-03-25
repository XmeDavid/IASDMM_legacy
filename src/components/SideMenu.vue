<template>
  <div class="bg-slate-50 dark:bg-neutral-900">
    <aside class="w-48 h-full shadow-xl" aria-label="Sidebar">
      <div class="h-full overflow-y-auto py-4 px-3 flex flex-col">
        <ul class="space-y-2">
          <img
            class="w-full"
            src="../assets/svg/logo/7asd-high-resolution-logo-color-on-transparent-background.svg"
            alt="IASD MM"
          />
          <hr />
          <li>
            <router-link
              to="/"
              :class="{['shadow-sm shadow-c-bluejay']: ('/' == currentTabPath)}"
              class="group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              <span
                class="ml-3 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                >Programa</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="/hymn_old"
              :class="{[' shadow-sm shadow-c-bluejay']: ('/hymn_old' == currentTabPath)}"
              class="group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
              <svg
                class="h-6 w-6 flex-shrink-0 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span
                class="ml-3 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                >Hinário</span
              >
              <span class="grow"></span>
              <span
                class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                >OLD</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="/hymn_new"
              :class="{[' shadow-sm shadow-c-bluejay']: ('/hymn_new' == currentTabPath)}"
              class="group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
              <svg
                class="h-6 w-6 flex-shrink-0 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span
                class="ml-3 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                >Hinário</span
              >
              <span class="grow"></span>
              <span
                class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-50 bg-c-bluejay-dull rounded dark:bg-c-bluejay-dark dark:text-zinc-300 group-hover:bg-c-bluejay group-hover:text-white"
                >NEW</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="/bible"
              :class="{[' shadow-sm shadow-c-bluejay']: ('/bible' == currentTabPath)}"
              class="group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
              <svg
                class="h-6 w-6 flex-shrink-0 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span
                class="ml-3 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                >Biblia</span
              >
            </router-link>
          </li>
        </ul>
        <div class="grow"></div>
        <ul>
          <li>
            <router-link
              to="/settings"
              :class="{[' shadow-sm shadow-c-bluejay']: ('/settings' == currentTabPath)}"
              class="group flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-700"
            >
              <svg
                class="h-6 w-6 flex-shrink-0 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span
                class="ml-3 transition duration-75 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
              >
                Settings</span
              >
            </router-link>
          </li>
        </ul>
        <ul>
          <li>
            <div class="flex flex-row mt-1">
              <InfoButton />
              <span class="grow" />
              <WindowToggle />
              <span class="grow" />
              <DarkMode />
            </div>
          </li>
        </ul>
        <div class="h-2">
        </div>
        <hr />
        <AudioPlayer />
      </div>
    </aside>
  </div>
</template>
  
<script>
import AudioPlayer from "./AudioPlayer.vue";
import DarkMode from "./DarkModeToggle.vue";
import WindowToggle from "./ProjectedToggle.vue";
import InfoButton from "./InfoButton.vue";

export default {
  name: "SideMenu",
  components: {
    AudioPlayer,
    DarkMode,
    WindowToggle,
    InfoButton,
  },
  methods:{
    
  },
  computed:{
    currentTabPath(){
      return this.$route.path
    }
  },
  mounted(){
  }
};
</script>
<style>
</style>
  