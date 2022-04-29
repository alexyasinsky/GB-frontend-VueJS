<template>
  <div class="cost">
    <h1>Cost Keeper</h1>
    <display-data :items="paymentsList"/>
    <my-button :handler="toggleShowForm">
      Add New Cost +
    </my-button>
    <add-data-form @addData='addPaymentData' v-show="isFormShown"/>
  </div>
</template>


<script>

  import DisplayData from "@/components/DisplayData";
  import AddDataForm from "@/components/AddDataForm";
  import myButton from "@/components/MyButton";

  export default {
    name: "CostKeeperView",
    components: {
      DisplayData,
      AddDataForm,
      myButton
    },
    data() {
      return {
        paymentsList: [],
        isFormShown: false,
      };
    },
    methods: {
      addPaymentData(data) {
        this.paymentsList.push(data);
      },
      fetchData() {
        return [
          {
            date: "28.03.2020",
            category: "Food",
            value: 169,
          },
          {
            date: "24.03.2020",
            category: "Transport",
            value: 360,
          },
          {
            date: "24.03.2020",
            category: "Food",
            value: 532,
          },
        ];
      },

      toggleShowForm() {
        this.isFormShown = !this.isFormShown;
      }
    },


    created() {
      this.paymentsList = this.fetchData()
    },

  }

</script>
