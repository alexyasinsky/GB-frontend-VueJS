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
              :item="editedItem"
              :cancel="close"
              :save="save"
          />
        </v-dialog>
        <v-dialog
            v-model="showPaymentDelete"
            max-width="500px"
        >
          <PaymentDelete
            :close="closeDelete"
            :confirm="deleteItemConfirm"
          />
        </v-dialog>
        <DisplayData
          :items="payments"
          :edit="editItem"
          :remove="deleteItem"
          :init="initialize"
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

        <PaymentChart
          :chart="chartData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PaymentDelete from "@/components/PaymentDelete";
import PaymentForm from "@/components/PaymentForm";
import DisplayData from "@/components/DisplayData";
import PaymentChart from "@/components/PaymentsChart";

export default {

  components: {
    PaymentChart,
    PaymentDelete,
    PaymentForm,
    DisplayData
  },
  data: () => ({
    showPaymentForm: false,
    showPaymentDelete: false,
    payments: [],
    chartData: {

    },
    editedIndex: -1,
    editedItem: {
      id: '',
      date: '',
      category: '',
      value: 0
    },
    defaultItem: {
      id: 0,
      date: '',
      category: '',
      value: 0
    },
  }),

  computed: {

    ...mapGetters('payments', [
        'getPaymentsData',
        'getLastPaymentId',
        'getPaymentsSums'
    ]),

    ...mapGetters('categories', [
       'getCategoryList'
    ]),

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },


    getId() {
      return this.editedIndex > -1 ? this.editedItem.id : this.getLastPaymentId + 1;
    },

    paymentSums() {
      return this.getPaymentsSums;
    }
  },

  watch: {
    showPaymentForm (val) {
      val || this.close()
    },
    showPaymentDelete (val) {
      val || this.closeDelete()
    },
  },


  async created () {
    await this.fetchPaymentsDataFromDB();
    await this.fetchCategoryList();
    await this.initialize();
    await this.calculateSums(this.getCategoryList);
    this.chartData = {
      labels: (Object.keys(this.getPaymentsSums)),
      datasets: [{
        backgroundColor: ['red', 'green', 'blue','red', 'green', 'blue'],
        data: ([...Object.values(this.getPaymentsSums)])
      }]
    }
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
        'fetchCategoryList'
    ]),

    async initialize () {
      this.payments = this.getPaymentsData;
    },

    editItem (item) {
      this.editedIndex = this.payments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showPaymentForm = true
    },

    deleteItem (item) {
      this.editedIndex = this.payments.indexOf(item);
      this.editedItem = Object.assign({}, item)
      this.showPaymentDelete = true
    },

    async deleteItemConfirm () {
      await this.deletePayment(this.editedIndex);
      await this.calculateSums(this.getCategoryList);
      this.chartData = {
        labels: (Object.keys(this.getPaymentsSums)),
        datasets: [{
          backgroundColor: ['red', 'green', 'blue','red', 'green', 'blue'],
          data: ([...Object.values(this.getPaymentsSums)])
        }]
      }
              // this.payments.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.showPaymentForm = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.showPaymentDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        const payment = this.editedItem;
        const index = this.editedIndex;
        this.editPayment({payment, index});

      } else {
        this.editedItem.id = this.getId;
        this.addPayment(this.editedItem);
        // this.payments.push(this.editedItem);
      }
      this.close()
    },

  },


}

</script>
