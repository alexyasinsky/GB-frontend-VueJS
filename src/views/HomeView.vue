<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="getPaymentsCurrentPageItems"/>
    <MyPagination :current="currentPage" :count="getPaymentsLastPage" @changePage="changePage"/>
    <my-button :handler="toggleShowForm">
      Add New Cost +
    </my-button>
    <add-data-form v-show="isFormShown" :current="currentPage"/>
  </div>
</template>


<script>

  import DisplayData from "@/components/DisplayData";
  import AddDataForm from "@/components/AddDataForm";
  import myButton from "@/components/MyButton";
  import MyPagination from "@/components/MyPagination.vue";

  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "HomeView",
    components: {
      DisplayData,
      AddDataForm,
      myButton,
      MyPagination
    },
    data() {
      return {
        currentPage: 1,
        isFormShown: false,
      };
    },
    methods: {

      ...mapActions('payments', [
        'fetchPaymentsDataFromDB',
        'fetchPaymentsLastPage'
      ]),

      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      },

      changePage(page){
        if(page !== this.currentPage) {
          this.$router.push(`/home/${page}`);
        }
      },
    },

    computed: {
      ...mapGetters('payments', [
        'getPaymentsLastPage',
        'getPaymentsCurrentPageItems'
      ])
    },

    async created() {
      await this.fetchPaymentsLastPage();
      let page = +this.$route.params.page;
      if(isNaN(page) || page > this.getPaymentsLastPage) {
        return this.$router.push('/home/1');
      }
      this.currentPage = page;
      return this.fetchPaymentsDataFromDB(page);
    },

    async beforeRouteUpdate(to, before, next) {
      let page = +to.params.page;
      if(isNaN(page) || page > this.getPaymentsLastPage) {
        return next('/home/1');
      } else {
        this.currentPage = page;
        await this.fetchPaymentsDataFromDB(page);
        return next();
      }
    }
  }

</script>
