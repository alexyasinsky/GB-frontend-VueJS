<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      {{ item }}
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
  }
}
</script>