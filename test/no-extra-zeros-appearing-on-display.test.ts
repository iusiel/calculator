import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';



test('zero must not show when pressing 0 after an operator button', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">1</span><span class="calculator__display-number">2</span><span class="calculator__display-number">3</span><span class="calculator__display-operator">+</span>`);
});


test('zero must not show when pressing 0 after pressing equals button', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("="));
  await fireEvent.click(within(buttonsContainer).getByText("0"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">1</span><span class="calculator__display-number">2</span><span class="calculator__display-number">3</span><span class="calculator__display-operator">+</span><span class="calculator__display-number">1</span><span class="calculator__display-number">2</span><div class="calculator__display-result"><span>=</span><span>135</span></div>`);
});