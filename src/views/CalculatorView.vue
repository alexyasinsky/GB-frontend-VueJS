<template>
  <div class="about">
    <h1>Let's calculate</h1>
    <div>
      <input v-model.lazy="operand1"/>
      <input v-model.lazy="operand2"/>
      = {{ result }}
      <br>
      <div>
        <button
            :title="operand"
            v-for="operand in operands"
            @click="calculate(operand)"
            :key="operand"
        >
          {{ operand }}
        </button>
      </div>
      <br>
      <label><input type="checkbox" v-model="isNumberKeyboardVisible">Показать экранную клавиатуру</label>
      <div v-show="isNumberKeyboardVisible">
        <button
            :title="number"
            v-for="number in getNumberArray(0,9)"
            @click="insertNumber(number)"
            :key="number"
        >
          {{ number }}
        </button>
        <button
          @click="deleteNumber()"
        >backspace</button>
        <br>
        <input type="radio" id='one' value="operand1" v-model="chosenOperand">
        <label for="one">Первый операнд</label>
        <br>
        <input type="radio" id='two' value="operand2" v-model="chosenOperand">
        <label for="two">Второй операнд</label>
        <br>
      </div>

    </div>
  </div>
</template>


<script>
  export default {
    name: "CalculatorView",
    data() {
      return {
        result: 0,
        operand1: "",
        operand2: "",
        operands: ["+", "-", "/", "*", "^"],
        isNumberKeyboardVisible: true,
        chosenOperand: 'operand1',
      };
    },
    methods: {

      sum() {
        this.result = +this.operand1 + +this.operand2
      },

      subtract() {
        this.result = +this.operand1 - +this.operand2
      },

      divide() {
        if (+this.operand2 !== 0) {
          this.result = +this.operand1 / +this.operand2
        } else {
          this.result = 'На ноль делить нельзя!'
        }
      },

      multiply() {
        this.result = +this.operand1 * +this.operand2
      },

      positivePow() {
        this.result = 1;
        for (let i = 0; i<+this.operand2; i++)
          this.result *= +this.operand1;
      },

      calculate(operation) {
        this.error = "";
        switch (operation) {
          case "+":
            this.sum();
            break;
          case "-":
            this.subtract();
            break;
          case "*":
            this.multiply();
            break;
          case "/":
            this.divide();
            break;
          case "^":
            this.positivePow();
            break;
        }
      },

      insertNumber(addedChar) {
        this[this.chosenOperand] += addedChar;
      },

      deleteNumber() {
        let array = this[this.chosenOperand].split("");
        array.pop();
        this[this.chosenOperand] = array.join("");
      },

      getNumberArray(start, finish) {
        let array = [];
        for (let i = start; i <= finish; i++) {
          array.push(String(i));
        }
        return array;
      }
    },

  }

</script>
