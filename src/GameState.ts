export enum SquareValue {
  X = 'X',
  O = 'O',
  NONE = '',
}

export enum Player {
  Player1 = 'One',
  Player2 = 'Two',
}

export type GameState = {
  currentPlayer: Player;
  board: SquareValue[][];
  gameOver: boolean;
  winner?: Player;
};

export const initialState = (): GameState => ({
  currentPlayer: Player.Player1,
  board: [
    [SquareValue.NONE, SquareValue.NONE, SquareValue.NONE],
    [SquareValue.NONE, SquareValue.NONE, SquareValue.NONE],
    [SquareValue.NONE, SquareValue.NONE, SquareValue.NONE],
  ],
  gameOver: false,
  winner: undefined,
});

const checkDiagonals = ({
  board,
  x,
  y,
}: {
  board: SquareValue[][];
  x: number;
  y: number;
}) => {
  const middle = board[1][1];
  switch (`${x}${y}`) {
    case '00':
    case '22':
      return board[0][0] === middle && board[2][2] === middle;
    case '20':
    case '02':
      return board[2][0] === middle && board[0][2] === middle;
    case '11':
      return (
        (board[0][0] === middle && board[2][2] === middle) ||
        (board[2][0] === middle && board[0][2] === middle)
      );
    default:
      return false;
  }
};

type GameAction =
  | {
      type: 'reset';
    }
  | {
      type: 'playSquare';
      position: { x: number; y: number };
    };

export const GameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'reset': {
      return initialState();
    }
    case 'playSquare': {
      const { x, y } = action.position;
      let gameOver = state.gameOver;
      let winner = state.winner;
      // Check every row and column
      const board = state.board.slice();
      const nextPlayer =
        state.currentPlayer === Player.Player1
          ? Player.Player2
          : Player.Player1;
      const playerValue =
        state.currentPlayer === Player.Player1 ? SquareValue.X : SquareValue.O;
      board[x][y] = playerValue;
      if (
        board[x].every((square) => square === playerValue) ||
        board.every((row) => row[y] === playerValue) ||
        checkDiagonals({ board, x, y })
      ) {
        gameOver = true;
        winner = state.currentPlayer;
      } else {
        gameOver = board.every((row) =>
          row.every((square) => square !== SquareValue.NONE)
        );
      }
      return { currentPlayer: nextPlayer, board, gameOver, winner };
    }
  }
};
