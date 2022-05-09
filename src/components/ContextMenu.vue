<template>
    <div class="menu">
      <my-button :handler="editPayment">Редактировать</my-button>
      <my-button :handler="deletePayment">Удалить</my-button>
    </div>
</template>

<script>
import MyButton from "@/components/MyButton";

export default {
  name: "ModalMenu",
  components: {MyButton},
  props: {
    settings: Object
  },
  methods: {
    editPayment() {
      console.log('edit');
    },

    deletePayment() {
      console.log('delete');
    },

    onCloseClick() {
      this.$modal.hide();
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu {
  }
</style>