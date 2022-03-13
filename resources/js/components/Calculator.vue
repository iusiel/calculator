<script>
import Display from './Display';
import CalculatorButton from './CalculatorButton';

export default {
  data: function() {
    return {
      currentEquation: [],
      documentElements: [],
      lastOperation: '',
    }
  },

  computed: {
    displayContent() {
      let result = '';
      this.documentElements.forEach((element) => {
        result = `${result}${element.outerHTML}`
      });

      return result;
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
      if (!this.numberPressAllowed(number)) {
        return false;
      }

      if (this.lastOperation === 'equalsPress') {
        this.currentEquation = [];
      }

      const lastElement = this.currentEquation.pop();
      const operations = ["+", "-", "*", "/"];
      if (operations.includes(lastElement)) {
        this.currentEquation.push(lastElement); //re-add operation to currentEquation array

        const span = document.createElement('span');
        span.innerText = number;
        this.documentElements.push(span);

        this.currentEquation.push(number);
      } else {
        const span = document.createElement('span');
        span.innerText = number;
        this.documentElements.push(span);

        const currentNumber = (lastElement !== undefined)  ? `${lastElement}${number}` : number;
        this.currentEquation.push(currentNumber);
      }

      this.lastOperation = 'numberPress';
    },

    operatorPress(operator) {
      if (this.lastOperation === 'dotPress') {
        return false;
      }

      let symbol = operator;
      if (symbol === "/") {
        symbol = "÷";
      }

      if (symbol === "*") {
        symbol = "×";
      }

      // automatically set display to 0 if user presses an operation button first
      if (this.currentEquation.length === 0 && this.documentElements.length === 0) {
          const span = document.createElement('span');
          span.innerText = 0;
          this.documentElements.push(span);
          this.currentEquation.push(0);
      }

      // display last result again if user presses operation button after pressing equals press
      if (this.currentEquation.length === 1 && this.lastOperation === 'equalsPress') {
          const splitted = this.currentEquation[0].toString().split("");
          splitted.forEach((element) => {
            const span = document.createElement('span');
            span.innerText = element;
            this.documentElements.push(span);
          });
      }


      if (this.lastOperation === 'operatorPress') {
        this.documentElements.pop();
        this.currentEquation.pop(); //remove last operation since the current operation will be overridden by new operation selected by user
      }


      const span = document.createElement('span');
      span.innerText = symbol;
      this.documentElements.push(span);

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

      let result;

      //loop using MDAS priority. calculation will continue until all calculations are finished
      while (this.currentEquation.length > 2) {
        const multiplicationSymbol = (element) => element == "*";
        let multiplyIndex = this.currentEquation.findIndex(multiplicationSymbol);
        if (multiplyIndex !== -1) {
            result = this.performOperation("*", multiplyIndex);
            continue;
        }

        const divisionSymbol = (element) => element == "/";
        let divisionIndex = this.currentEquation.findIndex(divisionSymbol);
        if (divisionIndex !== -1) {
          result = this.performOperation("/", divisionIndex);
          continue;
        }

        const additionSymbol = (element) => element == "+";
        let additionIndex = this.currentEquation.findIndex(additionSymbol);

        const subtractionSymbol = (element) => element == "-";
        let subtractionIndex = this.currentEquation.findIndex(subtractionSymbol);
  
        if (additionIndex !== -1 || subtractionIndex !== -1) {
          if (additionIndex < subtractionIndex && additionIndex !== -1) {
            result = this.performOperation("+", additionIndex);
            continue;
          } else if (subtractionIndex < additionIndex && subtractionIndex !== -1) {
            result = this.performOperation("-", subtractionIndex);
            continue;
          } else if (additionIndex < subtractionIndex && subtractionIndex !== -1) {
            result = this.performOperation("-", subtractionIndex);
            continue;
          } else {
            result = this.performOperation("+", additionIndex);
            continue;
          }
        }
      }


      const div = document.createElement('div');
      div.innerHTML = `<span>=</span><span>${result}</span>`;
      this.documentElements.push(div);

      this.lastOperation = 'equalsPress';
    },

    dotPressAllowed() {
      const lastElement = `${this.currentEquation.slice("-1")}`;
  
      if (this.lastOperation === 'dotPress' || (this.lastOperation === 'numberPress' && lastElement.includes(".") === true)) {
        return false;
      }

      return true;
    },

    dotPress()
    {
      if (!this.dotPressAllowed()) {
        return false;
      }

      if (this.lastOperation === 'equalsPress') {
        const span = document.createElement('span');
        span.innerText = "0";
        this.documentElements.push(span);
        this.currentEquation.push(0);   
      }

      // Display 0 on screen if first button pressed by user is .(dot) or if last pressed button is operation (e.g +, -)
      if ((this.currentEquation.length === 0) || (this.lastOperation === 'operatorPress')) {
        const span = document.createElement('span');
        span.innerText = "0";
        this.documentElements.push(span);
        this.currentEquation.push(0);
      }

      const lastElement = this.currentEquation.pop();
      const newElement = (lastElement !== undefined)  ? `${parseFloat(lastElement)}.`  : ".";
      this.currentEquation.push(newElement);

      const span = document.createElement('span');
      span.innerText = ".";
      this.documentElements.push(span);

      this.lastOperation = 'dotPress';
    },

    deletePress() {
      const lastDocumentElement = this.documentElements.slice(-1);

      // disable delete if last element is not a deleteable element (e.g. inputted number, operation)
      if (lastDocumentElement[0].nodeName == "DIV") {
        return false;
      }

      if (this.currentEquation.length > 0) {
        const lastElement = `${this.currentEquation.pop()}`;
        const newElement = lastElement.slice(0, lastElement.length - 1);
        if (newElement.length > 0) {
          this.currentEquation.push(newElement);
        }
        this.documentElements.pop();
      }
      this.lastOperation = 'deletePress';
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
