import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';


test('test mdas priority', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  const buttonsContainer = document.querySelector ('.buttons-container');

  // 12 + 13 * 10 = 142
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("×"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${12 + (13*10)}</span>`);

  //40 / 5 - 10 + 2 = 0
  await fireEvent.click(within(buttonsContainer).getByText("C"));
  await fireEvent.click(within(buttonsContainer).getByText("4"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("÷"));
  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("-"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${(40 / 5) - 10 + 2}</span>`);


  // 20 + 36 * 5 + 10 / 5 = 202
  await fireEvent.click(within(buttonsContainer).getByText("C"));
  await fireEvent.click(within(buttonsContainer).getByText("2"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("3"));
  await fireEvent.click(within(buttonsContainer).getByText("6"));
  await fireEvent.click(within(buttonsContainer).getByText("×"));
  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("+"));
  await fireEvent.click(within(buttonsContainer).getByText("1"));
  await fireEvent.click(within(buttonsContainer).getByText("0"));
  await fireEvent.click(within(buttonsContainer).getByText("÷"));
  await fireEvent.click(within(buttonsContainer).getByText("5"));
  await fireEvent.click(within(buttonsContainer).getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${20 + (36 * 5) + (10 / 5)}</span>`);
});
