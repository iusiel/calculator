// require('./bootstrap');
import Calculator from './components/Calculator';
import Vue from 'vue';

const app = new Vue({
    el: '#app',
    components: {Calculator},
    methods: {
        updateDisplayContent(content) {
            this.calculatorData.displayContent = content;
        }
    }
})