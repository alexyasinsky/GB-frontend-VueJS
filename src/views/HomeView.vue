<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="getPaymentsCurrentPageItems"/>
    <MyPagination :current="currentPage" :count="getPaymentsPagesCount" @changePage="changePage"/>
    <my-button :handler="toggleShowForm">
      Add New Cost +
    </my-button>
    <add-data-form v-show="isFormShown"/>
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
        'fetchPaymentsData',
      ]),
      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      },
      changePage(page){
        if(page !== this.currentPage) {
          this.$router.push(`/home/${page}`);
        }

      }
    },

    computed: {
      ...mapGetters('payments', [
        'getPaymentsPagesCount',
        'getPaymentsCurrentPageItems'
      ])
    },

    async created() {
      await this.fetchPaymentsData(this.currentPage);
    },

    beforeRouteUpdate(to, before, next) {
      let page = +to.params.page;
      if(isNaN(page) || page > this.getPaymentsPagesCount) page = 1;
      this.currentPage = page;
      this.fetchPaymentsData(page);
      next();
    }

  }

</script>
