<template>
  <div class="h-full w-full grid grid-cols-2 place-content-around">
    <div class="p-4 flex flex-col items-start">
        <p class="rotate-90">{{ getDate() }}</p>
        <div class="ml-4">
            <h1 :style="{ 'font-size' : 8*textRatio + 'px' }">{{ data.title }}</h1>
            <h3 :style="{ 'font-size' : 2*textRatio + 'px' }"> {{ data.subTitle }}</h3>
        </div>
        
    </div>
    <div class="p-4">
        <img class="w-full"
            src="../../assets/svg/logo/7asd-high-resolution-logo-color-on-transparent-background.svg"
            alt="IASD MM"
        />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      textRatio: window.innerWidth / 50,
    };
  },
  methods: {
    onResize() {
      this.textRatio = window.innerWidth / 50;
    },
    getDate(){
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${day}/${month}/${year}`
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

<style></style>
