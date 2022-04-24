<template>
  <form>
    <input v-model="date"  placeholder="date"/>
    <input v-model="category" placeholder="category"/>
    <input v-model="value" placeholder="value"/>
    <my-button :handler="onClickSave">Save</my-button>
  </form>
</template>

<script>
import MyButton from "@/components/MyButton";
export default {
  name: "AddDataForm",
  components: {MyButton},
  data() {
    return {
      date: "",
      category: "",
      value: ""
    }
  },
  computed: {
    getCurrentDate(){
      const today = new Date();
      let formatter = new Intl.DateTimeFormat("ru");
      return formatter.format(today);
    }
  },
  methods: {
    onClickSave(){
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value
      }
      this.$emit('addData', data)
    }
  },
}
</script>

<style scoped>

</style>