<template>
  <div :class="[$style.wrp]">
    <div @click="onClick(current - 1)">	&#60;</div>
    <div v-for="i in count"
    :key="i"
    :class="{[$style.active]: current === i}"
    @click="onClick(i)"
    >{{ i }}
    </div>
    <div @click="onClick(current + 1)">	&#62;</div>
  </div>
</template>
<script>
export default {
  name: "MyPagination",
  props: {
    count: Number,
    current: Number,
  },

  methods: {
    onClick(page) {
      if(page < 1 || page > this.count) {
        return
      }
      this.$emit('changePage', page)
    }
  },
}
</script>

<style module lang="scss">
.wrp {
  display: flex;
  & > div {
    padding: 10px;
    &.active {
      background: #ccc;
    }
  }
}
</style>
