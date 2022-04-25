<template>
  <div :class="[$style.wrp]">
    <div @click="onClick(cur - 1)">	&#60;</div>
    <div v-for="i in count"
    :key="i"
    :class="{[$style.active]: cur === i}"
    @click="onClick(i)"
    >{{ i }}
    </div>
    <div @click="onClick(cur + 1)">	&#62;</div>
  </div>
</template>
<script>
export default {
  name: "MyPagination",
  props: {
    count: Number,
    cur: Number,
  },

  methods: {
    onClick(p) {
      if(p<1 || p> this.count) {
        return
      }
      this.$emit('changePage', p)
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
