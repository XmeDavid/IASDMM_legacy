<template>
  <div class="flex flex-col h-24 bg-white dark:bg-winter-950">
    <input
      type="range"
      min="0"
      max="100"
      step=".01"
      v-model="progress"
      @input="updateSlider"
      :style="{ backgroundSize: backgroundSize }"
    />
    <div class="grid grid-cols-2 h-22">
      <div class="flex justify-between items-center p-2">
        <h3 class="font-medium text-lg select-none text-zinc-900 dark:text-zinc-100">Music name</h3>
        <div class="flex space-x-3 p-2">
          <!--Play buttons-->
          <button class="focus:outline-none text-zinc-700 hover:text-black">
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            class="rounded-full w-10 h-10 flex items-center justify-center pl-1 ring-2  focus:outline-none ring-gray-100 hover:ring-gray-200 text-zinc-700 hover:text-black"
          >
            <svg
              class="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <button class="focus:outline-none text-zinc-700 hover:text-black">
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
        <span></span>
      </div>

      <ul
        class="text-xs divide-y divide-zinc-300 dark:divide-black border-l border-zinc-300 dark:border-black cursor-default h-22 overflow-scroll no-scrollbar"
      >
        <li  class="flex items-center space-x-3 hover:bg-stone-100 hover:dark:bg-zinc-800">
          <button class="p-3 hover:bg-bluejay-400 hover:dark:bg-bluejay-600 group focus:outline-none">
            <svg
              class="w-4 h-4 group-hover:text-white dark:text-zinc-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <div class="flex-1 p-2 text-sm select-none text-zinc-800 hover:text-black dark:text-zinc-200 hover:dark:text-white">Song name</div>
          <div class="text-xs select-none text-zinc-600 dark:text-zinc-400 p-3">2:58</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      progress: 0,
      backgroundSize: "0% 100%",
    };
  },
  methods: {
    updateSlider(e) {
      let clickedElement = e.target,
        min = clickedElement.min,
        max = clickedElement.max,
        val = clickedElement.value;
      this.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    },
  },
};
</script>

<style>
/* Slider CSS */
input[type="range"] {
  -webkit-appearance: none;
  display: block;
  width: 100%;
  background: #383838;
  background-image: -webkit-linear-gradient(left, #3f88f2 0%, #3f88f2 100%);
  background-repeat: no-repeat;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0px;
  border: none;
}
input[type="range"]::-webkit-slider-thumb {
  height: 16px;
  width: 16px;
  border-radius: 2px;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent;
}
</style>