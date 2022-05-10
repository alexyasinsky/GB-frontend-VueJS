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

    async deletePayment() {
      await this.$router.push({
        name: 'home',
        params: {
          action: 'delete',
          context: 'payment',
        },
        query: {
          id: this.item.id
        }
      }).catch(() => {});
    },
  }

}
</script>

<style lang="scss" scoped>
  .menu {
  }
</style>