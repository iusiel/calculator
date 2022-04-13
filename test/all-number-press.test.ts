import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';



test('test all number presses', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  let button;
  const clearButton = getByText("C");
  const buttonsContainer = document.querySelector ('.buttons-container');

  button = getByText("1");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">1</span>`); // check if 1
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("2");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">2</span>`); // check if 2
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("3");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">3</span>`); // check if 3
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("4");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">4</span>`); // check if 4
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("5");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">5</span>`); // check if 5
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("6");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">6</span>`); // check if 6
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("7");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">7</span>`); // check if 7
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("8");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">8</span>`); // check if 8
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("9");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">9</span>`); // check if 9
  await fireEvent.click(clearButton); //reset display after assertion

  button = within(buttonsContainer).getByText("0");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">0</span>`); // check if 0
  await fireEvent.click(clearButton); //reset display after assertion

  button = getByText("1");
  await fireEvent.click(button);
  button = within(buttonsContainer).getByText("0");
  await fireEvent.click(button);
  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">1</span><span class="calculator__display-number">0</span>`); // check if 10
  await fireEvent.click(clearButton); //reset display after assertion 
})
