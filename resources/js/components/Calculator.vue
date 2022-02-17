<script>
import Display from './Display';
import CalculatorButton from './CalculatorButton';

export default {
  data: function() {
    return {
      displayContent: '',
      currentNumber: [0], 
      currentEquation: [0],
      lastOperation: '',
    }
  },

  components: {
      Display,
      CalculatorButton,
    },
  methods: {
    numberPressAllowed(number) {
      if (this.displayContent === "" && number == 0) {
        return false;
      }
      return true;
    },

    numberPress(number) {
      // console.log(this.currentNumber);
      // console.log(this.currentEquation);
      // console.log(this.displayContent);
      if (!this.numberPressAllowed(number)) {
        return false;
      }

      // make this.currentNumber and this.currentEquation empty arrays if user pressed a number as the very first input and the number inputted is not zero
      if (this.currentNumber[0] == 0 && this.currentEquation[0] == 0 && number != 0 && this.lastOperation !== 'dotPress') {
        // alert("!");
        this.currentNumber = [];
        this.currentEquation = [];
      }

      if (this.lastOperation === 'equalsPress') {
        this.currentNumber = [];
        this.currentEquation = [];
      }

      this.displayContent = `${this.displayContent}${number}`;
      this.currentNumber.push(number);
      this.lastOperation = 'numberPress';
    },

    operatorPress(operator) {
      console.log(this.displayContent.split(""));
      let symbol = operator;
      if (symbol === "/") {
        symbol = "÷";
      }

      if (symbol === "*") {
        symbol = "×";
      }

      // remove first element in case user pressed operation as first button before any number. this happens because this.currentEquation = [0] instead of this.currentEquation = [] which causes display issue if user tries to enter another operation
      // example that should be catched: + 1
      // example that should not be catched: 1 + 1
      if (this.currentEquation.length > 1 && this.currentEquation[0] == 0) {
        this.currentEquation.shift();
      }

      if (this.lastOperation === 'operatorPress') {
        this.displayContent = this.displayContent.slice(0, -2); //replace current operator symbol if user presses another operator symbol
        this.currentEquation.pop(); //remove last operation since the current operation will be overridden by new operation selected by user

      }

      if (this.currentEquation.length === 1) {
        this.displayContent = `${this.displayContent}${this.currentEquation[0]}`; //display first number before displaying the operation symbol
      }

      this.displayContent = `${this.displayContent} ${symbol} `; //display operation symbol
      const number = this.currentNumber.join("");
      if (number != "") {
        this.currentEquation.push(number); //generate full number based on digits pressed
        this.currentNumber = [];
      }

      this.currentEquation.push(operator);

      this.lastOperation = 'operatorPress';
    },

    equalsPressAllowed() {
      if (this.currentEquation.length < 2 || this.lastOperation === 'operatorPress') {
        return false;
      }

      if (this.currentEquation.length < 2) {
        return false;
      }

      return true;
    },

    performOperation(operator, index) {
      const firstNumber = parseFloat(this.currentEquation[index - 1]);
      const secondNumber = parseFloat(this.currentEquation[index + 1]);
      let result;

      if (operator === "+") {
        result = firstNumber + secondNumber;
      }

      if (operator === "-") {
        result = firstNumber - secondNumber;
      }

      if (operator === "*") {
        result = firstNumber * secondNumber;
      }

      if (operator === "/") {
        result = firstNumber / secondNumber;
      }
      
      // remove in array after performing operation so that they will not be repeated
      this.currentEquation[index - 1] = result;
      this.currentEquation.splice(index, 1);
      this.currentEquation.splice(index, 1);

      return result;
    },

    equalsPress() {
      if (!this.equalsPressAllowed()) {
        return false;
      }


      const number = this.currentNumber.join("");
      this.currentEquation.push(number);
      this.currentNumber = [];
      let result;


      //loop using MDAS priority. calculation will continue until all calculations are finished
      while (this.currentEquation.length > 2) {
        const multiplicationSymbol = (element) => element == "*";
        let index = this.currentEquation.findIndex(multiplicationSymbol);
        if (index !== -1) {
          result = this.performOperation("*", index);
        }

        const divisionSymbol = (element) => element == "/";
        index = this.currentEquation.findIndex(divisionSymbol);
        if (index !== -1) {
          result = this.performOperation("/", index);
        }

        const additionSymbol = (element) => element == "+";
        index = this.currentEquation.findIndex(additionSymbol);
        if (index !== -1) {
          result = this.performOperation("+", index);
        }

        const subtractionSymbol = (element) => element == "-";
        index = this.currentEquation.findIndex(subtractionSymbol);
        if (index !== -1) {
          result = this.performOperation("-", index);
        }
      }

      this.displayContent = `${this.displayContent} <br/> <b>= ${result}</b> <br/><br/>`;
      this.lastOperation = 'equalsPress';
    },

    dotPressAllowed() {
      if (this.lastOperation === 'dotPress' || this.currentNumber.includes(".") === true) {
        return false;
      }


      return true;
    },

    dotPress()
    {
      console.log(this.currentEquation[0] == 0);
      console.log(this.currentNumber[0] == 0);
      if (!this.dotPressAllowed()) {
        return false;
      }

      if (this.currentNumber[0] == 0 && this.currentEquation[0] == 0) {
        this.currentEquation = [];
      }

      // Display 0 on screen if first button pressed by user is .(dot) or if last pressed button is operation (e.g +, -)
      if ((this.currentNumber[0] == 0 && this.currentEquation.length === 0) || (this.lastOperation === 'operatorPress')) {
        this.displayContent = `${this.displayContent}0`;
      }

      this.currentNumber.push('.');
      this.displayContent = `${this.displayContent}.`;
      this.lastOperation = 'dotPress';
    },

    deletePress() {
     
      if (this.currentNumber.length === 0 && this.currentEquation.length > 0 && (this.lastOperation === 'operatorPress' || this.lastOperation === 'deletePress')) {
        this.currentEquation.pop();
        this.displayContent = this.displayContent.slice(0, -3);
        this.lastOperation = 'deletePress';


        // if (this.currentNumber.length === 0 && this.currentEquation > 0) {
          this.currentNumber = this.currentEquation.pop().split("");
        // }

      } else if (this.currentNumber.length > 0 && this.currentNumber[0] != 0 && (this.lastOperation === 'numberPress' || this.lastOperation === 'deletePress')) {


        this.currentNumber.pop();
        this.displayContent = this.displayContent.slice(0, -1);
        this.lastOperation = 'deletePress';
        
        if (this.currentNumber.length === 0 && this.currentEquation.length === 0) {
          this.currentNumber = [0];
          this.currentEquation = [0];
          // this.displayContent = `${this.displayContent} ${this.currentEquation[0]}`; //display first number before displaying the operation symbol
        }

      }

      console.log(this.currentNumber);
      console.log(this.currentEquation);

    }
  }
}
</script>

<template>
    <div>
        <display v-bind:content="displayContent"></display>
        <div>
            <calculator-button v-on:button-pressed="numberPress" press="1"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="2"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="3"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="4"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="5"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="6"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="7"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="8"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="9"></calculator-button>
            <calculator-button v-on:button-pressed="numberPress" press="0"></calculator-button>
            <calculator-button v-on:button-pressed="operatorPress" press="+"></calculator-button>
            <calculator-button v-on:button-pressed="operatorPress" press="-"></calculator-button>
            <calculator-button v-on:button-pressed="operatorPress" press="*" label="×"></calculator-button>
            <calculator-button v-on:button-pressed="operatorPress" press="/" label="÷"></calculator-button>
            <calculator-button v-on:button-pressed="equalsPress" press="="></calculator-button>
            <calculator-button v-on:button-pressed="dotPress" press="."></calculator-button>
            <calculator-button v-on:button-pressed="deletePress" press="Backspace" label="Delete"></calculator-button>
        </div>  
    </div>
</template>

<style>

</style>
