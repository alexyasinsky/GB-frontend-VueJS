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
          this.$router.push(`/${page}`);
        }

      }
    },

    computed: {
      ...mapGetters('payments', [
        'getPaymentsPagesCount',
        'getPaymentsCurrentPageItems'
      ])
    },

    watch: {
      // eslint-disable-next-line
      // currentPage: function(newPage, oldPage) {
      //   this.$router.push(`/${newPage}`);
      // }
    },
    async created() {
      await this.fetchPaymentsData(this.currentPage);
    },

    mounted() {
      // if(!this.$route.params?.page) this.$router.push('/1');
      // if(isNaN(this.$route.params.page)) {
      //   this.$router.push('/notfound');
      //   return;
      // }
      // this.fetchPaymentsData(this.$route.params.page);
      // this.currentPage = Number(this.$route.params.page);
    },

    beforeRouteUpdate(to, before, next) {
      console.log(to);
      const page = +to.params.page;
      this.currentPage = page;
      this.fetchPaymentsData(page);
      next();
    }

    


  }

</script>
