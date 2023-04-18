<template>
  <div class="h-full w-full grid grid-cols-2 place-content-around bg-[#bbaaff]">
    <div class="h-full p-4 flex flex-col items-start content-end">
      <div class="aspect-square absolute top-4 left-4">
        <p :style="{ 'font-size' : textRatio*1.25 + 'px' }" style="writing-mode: vertical-rl;" class="whitespace-nowrap">{{ getDate() }}</p>
      </div>
        
      <div class="">
        <h1 :style="{ 'font-size' : textRatio + 'rem', 'line-height': textRatio + 'rem' }">{{ data.title }}</h1>
        <h3 :style="{ 'font-size' : textRatio/4 + 'rem', 'line-height': textRatio/4 + 'rem' }"> {{ data.subTitle }}</h3>
      </div>
    </div>
    <div class="p-4">
      <div class="w-4/5 h-full relative">
        
        
        <div style="z-index: 0;" class="h-0 w-0 absolute top-1/2 left-1/2 shadow-dynamic-lg"></div>
      </div>
        
    </div>
    <img 
            class="absolute top-1/2 left-3/4 w-2/5 text-cente -translate-x-1/2 -translate-y-1/2"
            style="z-index: 9999;"
            src="../../assets/img/logo.png"
            alt="IASD MM"
        />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      textRatio: window.innerWidth / 100,
    };
  },
  methods: {
    onResize() {
      this.textRatio = window.innerWidth / 100;
    },
    getDate(){
        const options = { month: "long" };
        const date = new Date();
        let day = date.getDate();
        let month =new Intl.DateTimeFormat("pt-PT", options).format(date);
        let year = date.getFullYear();
        return `${day} de ${month} de ${year}`
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.data = JSON.parse(this.$router.currentRoute.value.params.data);
  },
};
</script>

<style>
.shadow-dynamic-lg {
    --tw-shadow: 0px 0px 50vw 20vw rgba(0,0,0,0.7);
    --tw-shadow-colored: 0px 0px 50vw 20vw var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
