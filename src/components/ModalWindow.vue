<template>
  <div>
    <component :is="settings.positionComp" :position="settings.position">
      <div class="content">
        <component :is="settings.component" :item="settings.item"/>
      </div>
      <div class="footer">
      </div>
    </component>
    <div class="close" @click="onCloseClick"></div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
    settings: Object
  },
  components: {
    CenterWrapper: () => import('./CenterWrapper'),
    RelativeWrapper: () => import('./RelativeWrapper'),
    DataForm: ()=>import('./DataForm.vue'),
    AuthForm: ()=>import('./AuthForm.vue'),
    ContextMenu: () => import('./ContextMenu'),
  },
  methods: {
    onCloseClick() {
      this.$modal.hide();
    }
  },
}
</script>

<style lang="scss" scoped >
  .close {
    position: absolute;
    z-index: 1;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }


</style>