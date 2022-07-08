import {screen, render, fireEvent, within} from '@testing-library/vue';
import Calculator from '/resources/js/components/Calculator.vue';

test('test', async () => {

  const { getByText } = render(Calculator, {
    props: {
      /* ... */
    }
  });
})
