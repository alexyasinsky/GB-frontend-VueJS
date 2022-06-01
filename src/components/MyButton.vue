<template>
  <button :name='name' @click.prevent="onClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    handler: {
      type: Function,
      default: () => {}
    },
    payload: {
      type: Object,
      default: ()=> {}
    },
    name: String
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