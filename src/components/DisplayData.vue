<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="payment__item">
      {{ item }}
    <button @click="openContextMenu">...</button>
  </div>
</div>
</template>

<script>
  export default {
  name: "DisplayData",

  props: {
    items: {
      type: Array,
      default: ()=>[]
    }
  },

    methods: {
      openContextMenu(event) {
        this.$modal.show('ContextMenu', {component: 'ContextMenu', positionComp: 'RelativeWrapper', position: {x: event.clientX, y: event.clientY}})
      }
    }

  }

</script>

<style scoped lang="scss">
  .payment__item {
    display: flex;
  }

</style>