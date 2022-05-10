<template>
  <div class="wrapper">
    <slot/>
  </div>
</template>

<script>


export default {
  name: "CenterWrapper",
  props: {

    position: {
      type: Object,
      default: () => {}
    },

  },


}
</script>

<style scoped>
  .wrapper {
    padding: 20px;
    position: absolute;
    top: 30%;
    left: 35%;
    background: #efefef;
    z-index: 2;
  }
</style>