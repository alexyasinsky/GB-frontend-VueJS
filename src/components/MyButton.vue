<template>
  <button @click.prevent="onClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    handler: {
      type: Function
    },
    payload: {
      type: Object,
      default: ()=> {}
    }
  },
  methods: {
    onClick() {
      this.handler(this.payload);
    }
  }
}
</script>

<style scoped>

</style>