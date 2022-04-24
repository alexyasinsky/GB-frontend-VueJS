<template>
  <button @click.prevent="handler">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    handler: {
      type: Function
    }
  }
}
</script>

<style scoped>

</style>