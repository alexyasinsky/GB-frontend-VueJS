<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="currentElements"/>
    <MyPagination :cur="cur" :length="getPaymentsList.length" :n="n" @changePage="changePage"/>
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
        n: 10,
        isFormShown: false,
      };
    },
    methods: {
      ...mapActions('payments', [
        'fetchData',
      ]),
      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      },
      changePage(p){
        this.cur = p
      }
    },

    computed: {
      ...mapGetters('payments', ['getFullPaymentValue', 'getPaymentsList']),
      currentElements(){
        return this.getPaymentsList.slice(this.n * (this.cur - 1), this.n * (this.cur -1) + this.n)
      }
    },

    created() {
      this.fetchData();
    },

  }

</script>
