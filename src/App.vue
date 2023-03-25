<template>
  <div class="flex flex-row dark:bg-zinc-900 bg-zinc-50 w-screen">
    <SideMenu class="z-50"/>
    <div class="flex flex-col h-screen w-full">
      <router-view class="h-full w-full"></router-view>
      <AudioPlayer/>
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/sidebar/SideMenu.vue";
import AudioPlayer from "./components/footer/AudioPlayer.vue";
export default {
  name: "App",
  components: {
    SideMenu,
    AudioPlayer
  },
  data(){
    return {
    }
  },
  methods: {
  },
  computed:{
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>
