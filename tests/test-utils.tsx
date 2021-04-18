import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

const withProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui) =>
  render(ui, {
    wrapper: withProvider,
  });

export * from '@testing-library/react';
export { customRender as render };
