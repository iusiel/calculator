import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';

test('one delete press', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">4</span><span class="calculator__display-number">5</span><span class="calculator__display-number">4</span><span class="calculator__display-operator">+</span><span class="calculator__display-number">1</span>`);
})

test('two delete press', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">4</span><span class="calculator__display-number">5</span><span class="calculator__display-number">4</span><span class="calculator__display-operator">+</span>`);
});


test('delete press after operation button', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("6"));
  await fireEvent.click(within(buttonsContainer).getByText("9"));
  await fireEvent.click(within(buttonsContainer).getByText("-"));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">5</span><span class="calculator__display-number">6</span><span class="calculator__display-number">9</span>`);
});

test('delete press after equals button', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("×"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("-"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("="));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">1</span><span class="calculator__display-number">2</span><span class="calculator__display-number">1</span><span class="calculator__display-number">3</span><span class="calculator__display-operator">+</span><span class="calculator__display-number">3</span><span class="calculator__display-number">1</span><span class="calculator__display-number">2</span><span class="calculator__display-number">3</span><span class="calculator__display-operator">×</span><span class="calculator__display-number">2</span><span class="calculator__display-number">3</span><span class="calculator__display-number">4</span><span class="calculator__display-operator">+</span><span class="calculator__display-number">1</span><span class="calculator__display-number">0</span><span class="calculator__display-operator">-</span><span class="calculator__display-number">2</span><div class="calculator__display-result"><span>=</span><span>732003</span></div>`);
});


test('delete press after decimal button', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("."));
  await fireEvent.click(within(buttonsContainer).getByText("Delete"));

  expect(document.body.querySelector('.calculator__display').innerHTML).toEqual(`<span class="calculator__display-number">5</span><span class="calculator__display-number">4</span><span class="calculator__display-number">3</span>`);
});
