import React, { useReducer } from 'react';
import './App.css';
import { GameReducer, initialState, SquareValue } from './GameState';
import { Square } from './Square';

function App() {
  const [state, dispatch] = useReducer(GameReducer, initialState());
  const SquareWrapper = ({ x, y }: { x: number; y: number }) => {
    return (
      <Square
        value={state.board[x][y]}
        trigger={() => dispatch({ type: 'playSquare', position: { x, y } })}
        disabled={state.gameOver || state.board[x][y] !== SquareValue.NONE}
      />
    );
  };
  return (
    <main className='App'>
      <div className='App-container'>
        <h1>
          {state.gameOver
            ? 'Game Over'
            : `Player ${state.currentPlayer}'s turn`}
        </h1>
        {state.gameOver ? (
          <div className='Finished'>
            <h3>
              {state.winner ? `Player ${state.currentPlayer} Wins` : 'Draw'}
            </h3>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </div>
        ) : null}
        <div className='Board'>
          {/* First Row */}
          <SquareWrapper x={0} y={0} />
          <SquareWrapper x={0} y={1} />
          <SquareWrapper x={0} y={2} />
          {/* Second Row */}
          <SquareWrapper x={1} y={0} />
          <SquareWrapper x={1} y={1} />
          <SquareWrapper x={1} y={2} />
          {/* Third Row */}
          <SquareWrapper x={2} y={0} />
          <SquareWrapper x={2} y={1} />
          <SquareWrapper x={2} y={2} />
        </div>
      </div>
    </main>
  );
}

export default App;
