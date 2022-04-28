<template>
  <div>
    <form>
        <input v-model="date"  placeholder="date"/>
        <select v-model="category" v-if="categoryList">
          <option disabled value="">category</option>
          <option v-for="(value, idx) in categoryList" :key="idx">{{value}}</option>
        </select>
        <input v-model="value" placeholder="value"/>
        <my-button :handler="onClickSave">Save</my-button>
      </form>
       <my-button :handler="showCategoryAddForm">Добавить новую категорию +</my-button>
       <form v-show="isNewCategoryFormShown">
         <input v-model="newCategory"  placeholder="category"/>
         <my-button :handler="onClickAddCategory">Добавить</my-button>
       </form>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  name: "AddDataForm",
  components: {MyButton},
  data() {
    return {
      date: "",
      category: "",
      value: "",
      newCategory: "",
      isNewCategoryFormShown: false
    }
  },
  props: {
    current: Number
  },
  computed: {
    ...mapGetters('category', ['getCategoryList']),
    ...mapGetters('payments', ['getPaymentsPagesCount']),
    getCurrentDate(){
      const today = new Date();
      let formatter = new Intl.DateTimeFormat("ru");
      return formatter.format(today);
    },
    categoryList(){
      return this.getCategoryList
    },
  },
  methods: {
    ...mapMutations('category', ['addCategory']),
    ...mapActions('category', ['fetchCategoryList']),
    ...mapActions('payments', ['addItemToPaymentsStore', 'fetchPaymentsData']),
    onClickSave (){
      const item = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value
      }
      return new Promise((res) => {
        this.addItemToPaymentsStore(item);
        res();
      }).then(()=> {
        if (this.getPaymentsPagesCount !== this.current) {
          this.$router.push(`/home/${this.getPaymentsPagesCount}`);
        } else {
          this.fetchPaymentsData(this.getPaymentsPagesCount);
        }
      })



    },
    onClickAddCategory() {
      if (!this.categoryList.find(category => category === this.newCategory)) {
        this.addCategory(this.newCategory);
        this.newCategory = '';
      } else {
        alert('Такая категория уже есть в списке');
      }
    },
    showCategoryAddForm() {
      this.isNewCategoryFormShown = !this.isNewCategoryFormShown
    }
  },

    async created() {
      await this.fetchCategoryList();
    },
  

}
</script>

<style scoped>

</style>