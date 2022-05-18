<template>
  <div class="cost">
    <button @click="openAuthForm">Authorization  (Modal)</button>
    <h1>Cost Keeper</h1>
    <display-data :items="getPaymentsCurrentPageItems" />
    <MyPagination
      :current="currentPage"
      :count="getPaymentsLastPage"
      @changePage="changePage"
    />
    <button @click="openAddPaymentForm">Add New Cost + (Modal)</button>
    <hr />
    <my-button :handler="addCustomPayment" :payload="customPayments[0]"
      >Food 500</my-button
    >
    <my-button :handler="addCustomPayment" :payload="customPayments[1]"
      >Transport 50</my-button
    >
    <my-button :handler="addCustomPayment" :payload="customPayments[2]"
      >Entertainment 2000</my-button
    >
  </div>
</template>

<script>
import DisplayData from '@/components/DisplayData';
import MyPagination from '@/components/MyPagination.vue';
import { mapActions, mapGetters } from 'vuex';
import MyButton from "@/components/MyButton";

export default {
  name: 'HomeView',
  components: {
    DisplayData,
    MyPagination,
    MyButton,
  },
  data() {
    return {
      currentPage: 1,
      isFormShown: false,
      customPayments: [
        {
          category: 'Food',
          value: 500,
        },
        {
          category: 'Transport',
          value: 50,
        },
        {
          category: 'Entertainment',
          value: 2000,
        },
      ],
    };
  },
  methods: {
    ...mapActions('payments', [
      'fetchPaymentsDataFromDB',
      'fetchPaymentsLastPage',
      'addPayment',
      'editPayment',
      'deletePayment'
    ]),

    changePage(page) {
      if (page !== this.currentPage) {
        this.$router.push(`/home/${page}`);
      }
    },

    addCustomPayment(payload) {
      this.$router
        .push({
          name: 'home',
          params: {
            action: 'add',
            context: 'payment',
            category: payload.category
          },
          query: {
            value: payload.value
          }
        })
        .catch(() => {});
    },

    async actionAddHandler(request, next, page) {
      const item = {
        date: request.query.date || this.getCurrentDate,
        category: request.params.category,
        value: request.query.value,
      };
      await this.addPayment(item);
      const paymentsLastPage = this.getPaymentsLastPage;
      if (paymentsLastPage !== page) {
        return next(`/home/${paymentsLastPage}`);
      } else {
        await this.fetchPaymentsDataFromDB(paymentsLastPage);
      }
    },

    async actionEditHandler(request, next, page) {
      const item = {
        id: request.query.id,
        date: request.query.date || this.getCurrentDate,
        category: request.params.category,
        value: request.query.value,
      };
      await this.editPayment({item, page});
      return next(`/home/${page}`);
    },

    async actionDeleteHandler(request, next, page) {
      const id = request.query.id;
      await this.deletePayment({id, page});
      return next(`/home/${page}`);
    },

    async loadPaymentPage(request, next) {
      let page = +request.params.page;
      if (isNaN(page) || page > this.getPaymentsLastPage) {
        return next('/home/1');
      } else {
        this.currentPage = page;
        await this.fetchPaymentsDataFromDB(page);
        return next();
      }
    },

    async checkExistingOfPaymentPage() {
      await this.fetchPaymentsLastPage();
      let page = +this.$route.params.page;
      if (isNaN(page) || page > this.getPaymentsLastPage) {
        return this.$router.push('/home/1');
      }
      this.currentPage = page;
      return this.fetchPaymentsDataFromDB(page);
    },

    openAddPaymentForm(){
      this.$modal.show('DataForm', {component: 'DataForm', positionComp: 'CenterWrapper'})
    },

    openAuthForm(){
      this.$modal.show('AuthForm', {component: 'AuthForm', positionComp: 'CenterWrapper'})
    }
  },

  computed: {
    ...mapGetters('payments', [
      'getPaymentsLastPage',
      'getPaymentsCurrentPageItems',
    ]),

    getCurrentDate() {
      const today = new Date();
      let formatter = new Intl.DateTimeFormat('ru');
      return formatter.format(today);
    },
  },

  async created() {
    await this.checkExistingOfPaymentPage();
  },

  async beforeRouteUpdate(to, before, next) {
    let action = to.params.action;
    let page = this.currentPage;
    switch (action) {
      case 'add':
        await this.actionAddHandler(to, next, page);
        break;
      case 'edit':
        await this.actionEditHandler(to, next, page)
        break;
      case 'delete':
        await this.actionDeleteHandler(to, next, page);
        break;
      default:
        await this.loadPaymentPage(to, next);
    }
  },
};
</script>
