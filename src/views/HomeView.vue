<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="getPaymentsCurrentPageItems"/>
    <MyPagination :current="currentPage" :count="getPaymentsLastPage" @changePage="changePage"/>
    <my-button :handler="toggleShowForm">
      Add New Cost +
    </my-button>
    <my-button :handler="addCustomPayment" :payload="customPayments[0]">Food 500</my-button>
    <my-button :handler="addCustomPayment" :payload="customPayments[1]">Transport 50</my-button>
    <my-button :handler="addCustomPayment" :payload="customPayments[2]">Entertainment 2000</my-button>
    <add-data-form v-show="isFormShown" :current="currentPage"/>
  </div>
</template>


<script>

  import DisplayData from "@/components/DisplayData";
  import AddDataForm from "@/components/AddDataForm";
  import myButton from "@/components/MyButton";
  import MyPagination from "@/components/MyPagination.vue";

  import { mapActions, mapGetters } from "vuex";
  import MyButton from '@/components/MyButton.vue';

  export default {
    name: "HomeView",
    components: {
      DisplayData,
      AddDataForm,
      myButton,
      MyPagination,
        MyButton
    },
    data() {
      return {
        currentPage: 1,
        isFormShown: false,
        customPayments: [
          {
            category: "Food",
            value: 500
          },
          {
            category: "Transport",
            value: 50
          },
          {
            category: "Entertainment",
            value: 2000
          },
        ]
      };
    },
    methods: {

      ...mapActions('payments', [
        'fetchPaymentsDataFromDB',
        'fetchPaymentsLastPage',
        'addPaymentToDB'
      ]),

      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      },

      changePage(page){
        if(page !== this.currentPage) {
          this.$router.push(`/home/${page}`);
        }
      },

      addCustomPayment(payload) {
        this.$router.push(`/home/add/payment/${payload.category}/?value=${payload.value}`);
      }
    },

    computed: {
      ...mapGetters('payments', [
        'getPaymentsLastPage',
        'getPaymentsCurrentPageItems'
      ]),

      getCurrentDate(){
        const today = new Date();
        let formatter = new Intl.DateTimeFormat("ru");
        return formatter.format(today);
      },

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
      let linkArray = to.path.split('/');
      switch(linkArray[2]) {
        case 'add':
          // eslint-disable-next-line no-case-declarations
          const item = {
            date: to.query.date || this.getCurrentDate,
            category: to.params.category,
            value: to.query.value
          }
          await this.addPaymentToDB(item);
          // eslint-disable-next-line no-case-declarations
          const paymentsLastPage = this.getPaymentsLastPage;
          if (paymentsLastPage !== this.currentPage) {
            return next(`/home/${paymentsLastPage}`);
          } else {
            this.fetchPaymentsDataFromDB(paymentsLastPage);
          }
          break;
        default:
          // eslint-disable-next-line no-case-declarations
          let page = +to.params.page;
          if(isNaN(page) || page > this.getPaymentsLastPage) {
            return next('/home/1');
          } else {
            this.currentPage = page;
            await this.fetchPaymentsDataFromDB(page);
            return next();
          }
        }
      },
  }

</script>
