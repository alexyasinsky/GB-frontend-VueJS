<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="payment__item">
      {{ item }}
      <div class="button-wrapper">
        <button @click="openSettings">...</button>
        <ModalMenu  v-if="modalShow"/>
      </div>
  </div>
</div>
</template>

<script>
  export default {
  name: "DisplayData",
    components: { ModalMenu:()=>import('./ModalMenu.vue') },

    props: {
      items: {
        type: Array,
        default: ()=>[]
      }
    },

    data() {
      return {
        modalShow: false,
        settings: {
        },
      };
    },

    methods: {
      onShow(data){
        this.modalShow = true
        this.settings = data
      },
      onHide(){
        this.settings = {}
        this.modalShow = false
      },

      openSettings() {
        this.$modal.show('ModalMenu', {})
      }
    },

    mounted() {
      this.$modal.EventBus.$on('show', this.onShow)
      this.$modal.EventBus.$on('hide', this.onHide)
    },

    beforeDestroy() {
      this.$modal.EventBus.$off('show', this.onShow)
      this.$modal.EventBus.$off('hide', this.onHide)
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