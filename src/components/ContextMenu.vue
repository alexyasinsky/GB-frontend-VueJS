<template>
    <div class="menu">
      <my-button :handler="editPayment">Редактировать</my-button><br>
      <my-button :handler="deletePayment">Удалить</my-button>
    </div>
</template>

<script>
import MyButton from "@/components/MyButton";

export default {
  name: "ModalMenu",
  components: {MyButton},

  props: {
    item: {
      type: Object,
      default: ()=>{}
    }
  },
  methods: {
    editPayment() {
      this.$modal.show('DataForm', {
        component: 'DataForm',
        positionComp: 'CenterWrapper',
        item: this.item
      })
    },

    deletePayment() {
      console.log('delete');
    },



  },

  mounted() {
    console.log(this.item);
  }
}
</script>

<style lang="scss" scoped>
  .menu {
  }
</style>