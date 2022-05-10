<template>
  <div class="wrapper" :style="positionStyle">
    <slot/>
  </div>
</template>

<script>


export default {
  name: "RelativeWrapper",
  props: {

    position: {
      type: Object,
      default: () => {}
    },

  },

  // data() {
  //   return {
  //
  //   }
  // },

  computed: {
    positionStyle() {
      return {
        top: this.position.y + 'px',
        left: this.position.x + 'px'
      }
    }
  },

}
</script>

<style scoped>
  .wrapper {
    padding: 20px;
    position: absolute;
    background: #efefef;
    z-index: 2;
  }
</style>