<template>
  <div id="app">
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/notfound">Not Found</router-link>
    </nav>
    <router-view/>
    <ModalWindow :settings="settings"  v-if="modalShow"/>
  </div>
</template>

<script>
export default {
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
    }
  },
  mounted() {
    this.$modal.EventBus.$on('show', this.onShow)
    this.$modal.EventBus.$on('hide', this.onHide)
  },
  beforeDestroy() {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('hide', this.onHide)
  },
  components: { ModalWindow:()=>import('./components/ModalWindow.vue') },
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}


  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
