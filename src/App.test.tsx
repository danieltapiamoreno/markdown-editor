import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByRole('textbox');
  const output = utils.getByTestId('output') as HTMLInputElement;
  return {
    input,
    output,
    ...utils,
  };
};

test('renders text input', () => {
  render(<App />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toBeInTheDocument();
});

test('it should render output component', () => {
  const { output } = setup();
  expect(output).toBeInTheDocument();
});
