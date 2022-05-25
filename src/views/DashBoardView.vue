<template>
  <v-container>
    <v-row>
      <v-col
        cols="5"
      >
        <div
            :class="['text-h4', 'my-3', 'font-weight-regular', 'text-center']"
        >
          Cost Keeper
        </div>
        <v-dialog
            v-model="showPaymentForm"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="teal"
                dark
                class="my-3"
                v-bind="attrs"
                v-on="on"
            >
              Add New Cost
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <paymentForm
              :title="formTitle"
              :closeForm="closeForm"
              :index="editedIndex"
              :edited="editedItem"
          />
        </v-dialog>
        <v-dialog
            v-model="showPaymentDelete"
            max-width="500px"
        >
          <ModalConfirm
            title='Are you sure you want to delete this item?'
            :cancel="closeModalDelete"
            :ok="modalDeleteConfirm"
          />
        </v-dialog>
        <DisplayData
          :items="payments"
          :edit="initEditingItem"
          :remove="initDeletingItem"
          :reset="setPayments"
        />
      </v-col>
      <v-spacer></v-spacer>
      <v-col
          cols="5"
      >
        <div
            :class="['text-h4', 'my-3', 'font-weight-regular', 'text-center']"
        >
          Cost by categories
        </div>

        <DoughnutChart
          :chart="getPaymentsSums"
          :colors='getCategoryColors'
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PaymentForm from "@/components/PaymentForm";
import DisplayData from "@/components/DisplayData";
import DoughnutChart from "@/components/DoughnutChart";
import ModalConfirm from "@/components/ModalConfirm";

export default {

  components: {
    DoughnutChart,
    ModalConfirm,
    PaymentForm,
    DisplayData
  },
  data: () => ({
    showPaymentForm: false,
    showPaymentDelete: false,
    payments: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    chartData: {
      labels: [],
      datasets: []
    },
  }),

  computed: {

    ...mapGetters('payments', [
        'getPaymentsData',
        'getPaymentsSums'
    ]),

    ...mapGetters('categories', [
      'getCategoryNames',
      'getCategoryColors'
    ]),

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    paymentSums() {
      return this.getPaymentsSums;
    }
  },

  async created () {
    await this.fetchCategories();
    await this.fetchPaymentsDataFromDB();
    await this.setPayments();
    await this.calculateSums(this.getCategoryNames);
  },

  methods: {
    ...mapActions('payments', [
        'fetchPaymentsDataFromDB',
        'addPayment',
        'editPayment',
        'deletePayment',
        'calculateSums',
    ]),

    ...mapActions('categories', [
        'fetchCategories'
    ]),

    setPayments () {
      this.payments = this.getPaymentsData;
    },

    initEditingItem (item) {
      this.editedIndex = this.payments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showPaymentForm = true
    },

    initDeletingItem (item) {
      this.editedIndex = this.payments.indexOf(item);
      this.editedItem = Object.assign({}, item)
      this.showPaymentDelete = true
    },

    closeForm () {
      this.showPaymentForm = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },

    async modalDeleteConfirm () {
      await this.deletePayment(this.editedIndex);
      await this.calculateSums(this.getCategoryNames);
      this.closeModalDelete();
    },

    closeModalDelete () {
      this.showPaymentDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

  },

}

</script>
