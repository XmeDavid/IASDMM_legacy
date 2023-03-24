<template>
  <div class="flex flex-row dark:bg-zinc-900 bg-zinc-50">
    <SideMenu/>
    <router-view class="h-screen w-full"></router-view>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue";
export default {
  name: "App",
  components: {
    SideMenu,
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
