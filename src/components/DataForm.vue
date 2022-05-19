<template>
  <div>
    <form>
      <input v-model="date"  placeholder="date"/>
      <select v-model="category" v-if="categoryList">
        <option disabled value="">category</option>
        <option v-for="(value, idx) in categoryList" :key="idx">{{value}}</option>
      </select>
      <input v-model="value" placeholder="value"/>
      <myButton :handler="onClickSave">Save</myButton>
    </form>
    <myButton :handler="showCategoryAddForm">Добавить новую категорию +</myButton>
       <form v-show="isNewCategoryFormShown">
         <input v-model="newCategory"  placeholder="category"/>
         <myButton :handler="onClickAddCategory">Добавить</myButton>
       </form>      
  </div>
</template>

<script>

  import MyButton from "@/components/MyButton";
  import { mapMutations, mapActions, mapGetters } from 'vuex';

  export default {

    name: "DataForm",

    components: {MyButton},

    props: {
      item: {
        type: Object,
        default: ()=>{}
      }
    },

    data() {
      return {
        action: 'add',
        id: 0,
        date: "",
        category: "",
        value: "",
        newCategory: "",
        isNewCategoryFormShown: false,
      }
    },
    
    computed: {

      ...mapGetters('category', ['getCategoryList']),

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

      async onClickSave (){
        await this.$router.push({
          name: 'home',
          params: {
            action: this.action,
            context: 'payment',
            category: this.category || "empty",
          },
          query: {
            value: this.value || null,
            date: this.date||this.getCurrentDate,
            id: this.id
          }
        }).catch(() => {});
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
      },


    },

    async created() {
      await this.fetchCategoryList();
    },

    mounted() {
      if (this.item) {
        this.id = this.item.id;
        this.date = this.item.date;
        this.category = this.item.category;
        this.value = this.item.value;
        this.action = 'edit';
      }

    }


  }
</script>

<style scoped>

</style>