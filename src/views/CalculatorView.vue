<template>
  <div class="about">
    <h1>Let's calculate</h1>
    <div>
      <input v-model.number.lazy="operand1"/>
      <input v-model.number.lazy="operand2"/>
      = {{ result }}
      <br>
      <button @click="sum">+</button>
      <button @click="div">-</button>
      <button @click="sub">/</button>
      <button @click="multiply">*</button>
      <button @click="positivePow">^</button>
    </div>
  </div>
</template>


<script>
  export default {
    name: "CalculatorView",
    data() {
      return {
        result: 0,
        operand1: 0,
        operand2: 0,
        textValue: "",
        textValue2: "",
      };
    },
    methods: {

      sum() {
        this.result = this.operand1 + this.operand2
      },
      div() {
        this.result = this.operand1 - this.operand2
      },
      sub() {
        if (this.operand2 !== 0) {
          this.result = this.operand1 / this.operand2
        } else {
          this.result = 'На ноль делить нельзя!'
        }

      },
      multiply() {
        this.result = this.operand1 * this.operand2
      },
      positivePow() {
        this.result = 1;
        for (let i = 0; i<this.operand2; i++)
          this.result *= this.operand1;
      }
    }
  }

</script>
