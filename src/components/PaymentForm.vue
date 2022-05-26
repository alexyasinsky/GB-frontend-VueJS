<template>
  <div>
    <v-dialog
        v-model="showCalendar"
        width="290px"
    >
      <ModalCalendar
          :handler="handleCalendarButton"
      />
    </v-dialog>
    <v-dialog
        width="300px"
        v-model="showCategoryForm"
    >
      <CategoryForm
          :add="addCategoryButtonHandler"
      />
    </v-dialog>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    :append-icon="'mdi-calendar'"
                    v-model="editedItem.date"
                    label="Date"
                    @click:append="toggleCalendar"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-select
                    :items="categoryList"
                    label="Category"
                    v-model="editedItem.category"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="toggleCategoryForm"
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.value"
                    label="Value"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="cancelButtonHandler"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="saveButtonHandler"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
  </div>

</template>

<script>

import {mapActions, mapGetters} from "vuex";
import ModalCalendar from "@/components/ModalCalendar";
import CategoryForm from "@/components/CategoryForm";

export default {
  name: "PaymentForm",

  props: {
    title: String,
    closeForm: Function,
    index: Number,
    edited: Object,
  },

  components: {
    ModalCalendar,
    CategoryForm
  },

  data: () => ({
    showCalendar: false,
    showCategoryForm: false,
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
    ...mapGetters('categories', ['getCategoryNames']),
    ...mapGetters('payments', ['getLastPaymentId']),

    categoryList(){
      return this.getCategoryNames;
    },
  },

  methods: {
    ...mapActions('categories', [
        'addCategory'
    ]),

    ...mapActions('payments', [
      'addPayment',
      'editPayment',
      'calculateSums',
    ]),

    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },

    handleCalendarButton(date) {
      this.editedItem.date = date;
      this.showCalendar = false;
    },

    addCategoryButtonHandler(category) {
      this.addCategory(category);
      this.showCategoryForm = false;
    },

    toggleCategoryForm() {
      this.showCategoryForm = !this.showCategoryForm;
    },

    cancelButtonHandler() {
      this.closeForm();
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    async saveButtonHandler() {
      const payment = Object.assign({}, this.editedItem);
      const index = this.index;
      if (index > -1) {
        payment.value = +payment.value;
        await this.editPayment({ payment, index});
        await this.calculateSums(this.getCategoryNames);
      } else {
        payment.id = this.getId();
        payment.value = +payment.value;
        await this.addPayment(payment);
        await this.calculateSums(this.getCategoryNames);
      }
      this.closeForm();
    },

    getId() {
      if (this.index > -1) {
        return this.editedItem.id;
      } else {
        return this.getLastPaymentId + 1;
      }
    },

    setEditedItem() {
      if (this.index > -1) {
        this.editedItem = Object.assign({}, this.edited);
      } else {
        this.editedItem = Object.assign({}, this.defaultItem);
      }
    }
  },

  watch: {
    index: {
      handler: function () {
        this.setEditedItem();
      },
      immediate: true
    } 

  },

}

</script>

<style scoped>

</style>