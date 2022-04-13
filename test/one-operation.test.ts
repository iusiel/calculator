import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';

test('test', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });

  // addition test
  await fireEvent.click(getByText("1"));
  await fireEvent.click(getByText("2"));
  await fireEvent.click(getByText("3"));
  await fireEvent.click(getByText("+"));
  await fireEvent.click(getByText("4"));
  await fireEvent.click(getByText("5"));
  await fireEvent.click(getByText("6"));
  await fireEvent.click(getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${123 + 456}</span>`);

  // subtraction test
  await fireEvent.click(getByText("C"));
  await fireEvent.click(getByText("7"));
  await fireEvent.click(getByText("8"));
  await fireEvent.click(getByText("9"));
  await fireEvent.click(getByText("-"));
  await fireEvent.click(getByText("1"));
  await fireEvent.click(getByText("0"));
  await fireEvent.click(getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${789 - 10}</span>`);

  // multiplication test
  await fireEvent.click(getByText("C"));
  await fireEvent.click(getByText("4"));
  await fireEvent.click(getByText("6"));
  await fireEvent.click(getByText("×"));
  await fireEvent.click(getByText("3"));
  await fireEvent.click(getByText("8"));
  await fireEvent.click(getByText("9"));
  await fireEvent.click(getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${46 * 389}</span>`);

  // division test
  await fireEvent.click(getByText("C"));
  await fireEvent.click(getByText("3"));
  await fireEvent.click(getByText("9"));
  await fireEvent.click(getByText("8"));
  await fireEvent.click(getByText("7"));
  await fireEvent.click(getByText("÷"));
  await fireEvent.click(getByText("5"));
  await fireEvent.click(getByText("4"));
  await fireEvent.click(getByText("1"));
  await fireEvent.click(getByText("="));
  expect(document.body.querySelector('.calculator__display-result').innerHTML).toEqual(`<span>=</span><span>${3987 / 541}</span>`);

})
