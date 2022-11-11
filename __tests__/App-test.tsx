import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { debug } from 'react-native-reanimated';
import App, { TicTacToeScreen } from '../App';



test('should to show page initial Tic Tac Toe', async () => {

  const { getByText } = render(<App />);

  await waitFor(() => getByText('Tic Tac Toe'));
});

test('first status player', () => {

  const expectedStatusInitial = "Next player: X";

  render(<App />);

  const todoElement = screen.getByText(expectedStatusInitial) ;

  //expect(todoElement).toHaveTextContent('Next player: X');
  //expect(screen.toJSON()).toMatchSnapshot();

});

test('after player X move, should to be player O to play', () => {

  const push = jest.fn();

  const { getAllByTestId } = render(<App />);

  // first move of player X
  const toggle = getAllByTestId('squareID')[0];
  fireEvent.press(toggle);
  
  //now should to be player O
  const expected = "Next player: O";
  const todoElement = screen.getByText(expected) ;

});

test('after player X move, should to be show move in history', () => {

  const push = jest.fn();

  const { getAllByTestId } = render(<App />);

  // first move of player X
  const toPlay = getAllByTestId('squareID')[0];
  fireEvent.press(toPlay);

  // navigate to History Screen
  const toHistory = screen.getByText('History');
  fireEvent.press(toHistory);
  
  const expected = "Go to move #1";
  const todoElement = screen.getByText(expected) ;

});

test('check player X winner', () => {

  const push = jest.fn();

  const { getAllByTestId } = render(<App />);

  // first move of player X
  const toggle = getAllByTestId('squareID');

  const expectedX = "Next player: X";
  const expectedO = "Next player: O";

  //player X moves
  fireEvent.press(toggle[0]);
  screen.getByText(expectedO);
  
  //player O moves
  fireEvent.press(toggle[1]);
  screen.getByText(expectedX);

  //player X moves
  fireEvent.press(toggle[3]);
  screen.getByText(expectedO);

  //player O moves
  fireEvent.press(toggle[4]);
  screen.getByText(expectedX);

  //player X moves
  fireEvent.press(toggle[6]);
  screen.getByText("Winner: X") ;
});