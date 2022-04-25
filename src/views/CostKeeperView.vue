<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="getPaymentsCurrentPage"/>
    <MyPagination :cur="cur" :count="getPaymentsPagesCount" @changePage="changePage"/>
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
    name: "CostKeeperView",
    components: {
      DisplayData,
      AddDataForm,
      myButton,
      MyPagination
    },
    data() {
      return {
        cur: 1,
        isFormShown: false,
      };
    },
    methods: {
      ...mapActions('payments', [
        'fetchPaymentsData',
        'fetchPaymentsPagesCount',
        'receivePaymentsCurrentPageItems'
      ]),
      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      },
      async changePage(p){
        this.cur = p;
        await this.fetchPaymentsData(p);
        // await this.receivePaymentsCurrentPageItems(p);
      }
    },

    computed: {
      ...mapGetters('payments', [
        'getPaymentsStore',
        'getPaymentsPagesCount',
        'getPaymentsCurrentPage'
      ]),
      currentElements(){
        return this.getStore;
      }
    },

    async created() {
      await this.fetchPaymentsData(this.cur);
      // await this.fetchPaymentsPagesCount();
      // await this.receivePaymentsCurrentPageItems(this.cur);
    },


  }

</script>
