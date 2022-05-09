<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="payment__item">
      {{ item }}
      <div class="button-wrapper">
        <button @click="openContextMenu">...</button>
      </div>
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
      openContextMenu() {
        this.$modal.show('ContextMenu', {title: "Context Menu", component: 'ContextMenu'})
      }
    }

  }

</script>

<style scoped lang="scss">
  .payment__item {
    display: flex;
  }

  .button-wrapper {

  }
</style>