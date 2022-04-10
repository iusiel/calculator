<script>
import Display from './Display.vue';
import CalculatorButton from './CalculatorButton.vue';

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
      const lastElement = this.currentEquation.slice(-1);
      const predictedNumber = (lastElement[0] !== undefined) ? `${lastElement[0]}${number}` : number; 

      if (this.currentEquation.length <=1 && ((parseFloat(predictedNumber) == 0 && predictedNumber.toString().length == 1) || isNaN(predictedNumber))) {
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
        span.classList.add('calculator__display-number');
        span.innerText = number;
        this.documentElements.push(span);

        this.currentEquation.push(number);
      } else {
        const span = document.createElement('span');
        span.classList.add('calculator__display-number');
        span.innerText = number;
        this.documentElements.push(span);

        const currentNumber = (lastElement !== undefined)  ? `${lastElement}${number}` : number;
        this.currentEquation.push(currentNumber);
      }

      this.lastOperation = 'numberPress';
      this.setDisplayScrollToBottom();
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
          span.classList.add('calculator__display-number');
          span.innerText = 0;
          this.documentElements.push(span);
          this.currentEquation.push(0);
      }

      // display last result again if user presses operation button after pressing equals press
      if (this.currentEquation.length === 1 && this.lastOperation === 'equalsPress') {
          const splitted = this.currentEquation[0].toString().split("");
          splitted.forEach((element) => {
            const span = document.createElement('span');
            span.classList.add('calculator__display-number');
            span.innerText = element;
            this.documentElements.push(span);
          });
      }


      if (this.lastOperation === 'operatorPress') {
        this.documentElements.pop();
        this.currentEquation.pop(); //remove last operation since the current operation will be overridden by new operation selected by user
      }


      const span = document.createElement('span');
      span.classList.add('calculator__display-operator');
      span.innerText = symbol;
      this.documentElements.push(span);

      this.currentEquation.push(operator);

      this.lastOperation = 'operatorPress';
      this.setDisplayScrollToBottom();
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

    performPercentage(index) {
      const firstNumber = parseFloat(this.currentEquation[index - 1]);
      const result = parseFloat(firstNumber / 100);
      this.currentEquation[index - 1] = result;
      this.currentEquation.splice(index, 1);
    },

    equalsPress() {
      if (!this.equalsPressAllowed()) {
        return false;
      }

      let result;

      //loop using MDAS priority. calculation will continue until all calculations are finished
      while (this.currentEquation.length > 2) {
        const percentSymbol = (element) => element == "%";
        let percentIndex = this.currentEquation.findIndex(percentSymbol);
        if (percentIndex !== -1) {
            result = this.performPercentage(percentIndex);
            continue;
        }

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
      div.classList.add('calculator__display-result');
      div.innerHTML = `<span>=</span><span>${result}</span>`;
      this.documentElements.push(div);

      this.lastOperation = 'equalsPress';
      this.setDisplayScrollToBottom();
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
        span.classList.add('calculator__display-number');
        span.innerText = "0";
        this.documentElements.push(span);
        this.currentEquation.push(0);   
      }

      // Display 0 on screen if first button pressed by user is .(dot) or if last pressed button is operation (e.g +, -)
      if ((this.currentEquation.length === 0) || (this.lastOperation === 'operatorPress')) {
        const span = document.createElement('span');
        span.classList.add('calculator__display-number');
        span.innerText = "0";
        this.documentElements.push(span);
        this.currentEquation.push(0);
      }

      const lastElement = this.currentEquation.pop();
      const newElement = (lastElement !== undefined)  ? `${parseFloat(lastElement)}.`  : ".";
      this.currentEquation.push(newElement);

      const span = document.createElement('span');
      span.classList.add('calculator__display-dot');
      span.innerText = ".";
      this.documentElements.push(span);

      this.lastOperation = 'dotPress';
      this.setDisplayScrollToBottom();
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
      this.setDisplayScrollToBottom();
    },

    clearPress() {
      const lastDocumentElement = this.documentElements.slice(-1);
      if (lastDocumentElement[0] !== undefined && lastDocumentElement[0].nodeName !== 'DIV') {
        // if user is in middle of inputting an equation, only clear the current equation but preserve the last results.
        const currentEquationString = this.currentEquation.join("");
        this.documentElements.splice(currentEquationString.length * -1);
        this.currentEquation = [];

        // const span = document.createElement('span');
        // span.innerText = 0;
        // this.documentElements.push(span);
        // this.currentEquation.push(0);
      } else {
        // clear all results
        this.currentEquation = [];
        this.documentElements = [];
      }

      this.lastOperation = 'clearPress';
      this.setDisplayScrollToBottom();
    },

    setDisplayScrollToBottom() {
      setTimeout(function () {
        const display = document.querySelector('.calculator__display');
        if (display !== null) {
          display.scrollTop = display.scrollHeight;
        }
      }, 10);
    },

    percentPress() {
      
      if (this.lastOperation === 'operatorPress' || this.lastOperation === 'percentPress' || this.lastOperation === 'equalsPress') {
        return false;
      }
      
      const span = document.createElement('span');
      span.classList.add('calculator__display-percent');
      span.innerText = "%";
      this.documentElements.push(span);

      this.currentEquation.push('%');

      this.lastOperation = 'percentPress';

    }
  }
}
</script>

<template>
    <div class="calculator-cointainer">
        <display v-bind:content="displayContent"></display>
        <div class="buttons-container">
            <div class="column">
              <calculator-button v-on:button-pressed="clearPress" press="Escape" label="C"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="deletePress" press="Backspace" label="Delete"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="percentPress" press="%"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="operatorPress" press="/" label="÷"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="7"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="8"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="9"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="operatorPress" press="*" label="×"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="4"></calculator-button>
            </div>
            <div class="column">
            <calculator-button v-on:button-pressed="numberPress" press="5"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="6"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="operatorPress" press="-"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="1"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="2"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="3"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="operatorPress" press="+"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="numberPress" press="0"></calculator-button>
            </div>
            <div class="column">
              <calculator-button v-on:button-pressed="dotPress" press="."></calculator-button>
            </div>
            <div class="column column-equals">
              <calculator-button v-on:button-pressed="equalsPress" press="="></calculator-button>
            </div>
        </div>  
    </div>
</template>

<style>

</style>
