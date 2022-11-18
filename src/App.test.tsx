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

describe("When text is separated by an empty new line, it get's rendered into a new <p> block.", () => {
  test('it should render empty lines as a p block', () => {
    //arrange
    const { input, output } = setup();

    //act
    fireEvent.change(input, { target: { value: 'Paragraph\n' } });

    //assert
    expect(output.innerHTML).toBe('<p>Paragraph</p><p></p>');
  });

  test('it should render new lines as <p> blocks', () => {
    //arrange
    const { input, output } = setup();

    //act
    fireEvent.change(input, {
      target: {
        value: 'Paragraph1' + '\nParagraph2',
      },
    });

    //assert
    expect(output.innerHTML).toBe('<p>Paragraph1</p>' + '<p>Paragraph2</p>');
  });

  test('it should render text into a <p> block', () => {
    //arrange
    const { input, output } = setup();

    //act
    fireEvent.change(input, { target: { value: 'Paragraph' } });

    //assert
    expect(output.innerHTML).toBe('<p>Paragraph</p>');
  });
});

describe('When a block starts with # or ## it is rendered in a <h1> and <h2> block respectively.', () => {
  test('it should render # as <h1> block', () => {
    //arrange
    const { input, output } = setup();

    //act
    fireEvent.change(input, { target: { value: '#Title 1' } });

    //assert
    expect(output.innerHTML).toBe('<h1>Title 1</h1>');
  });

  test('it should render ## as <h2> block', () => {
    //arrange
    const { input, output } = setup();

    //act
    fireEvent.change(input, { target: { value: '##Title 2' } });

    //assert
    expect(output.innerHTML).toBe('<h2>Title 2</h2>');
  });
});
