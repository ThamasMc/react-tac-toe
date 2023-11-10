import { useState } from 'react';

function Square({ val, fooClick }) {

  return(
    <button
      className="square"
      onClick={fooClick}
    >
      { val }
    </button>
  );
}

/* React words of wisdom: 
 * To collect data from multiple children, or to have two child components communicate with each other,
 * declare the shared state in their parent component instead. The parent component can pass that state
 * back down to the children via props. This keeps the child components in sync with each other and with their parent.
 *
 * Lifting state into a parent component is common when React components are refactored. */

function Board({ xActive, spaces, onPlay }) {
  let boardSize = 3;
  let count = 0;

  function barClick(pos) {
    if(spaces[pos] || calculateWinner(spaces)) return;

    let newSpaces = spaces.slice();

    let newCharacter = xActive ? 'X' : 'O'
    newSpaces[pos] = newCharacter;
    onPlay(newSpaces);
  }

  let status = calculateWinner(spaces) ? `${xActive ? 'O' : 'X'} is our winner!` : `It is ${xActive ? 'X' : 'O'}'s turn`

   const renderRow = (rowIndex) => (
     <div className="board-row" key={rowIndex}>
       {[0, 1, 2].map((colIndex) => {
         const position = rowIndex * boardSize + colIndex;
         return (
           <Square
             key={colIndex}
             val={spaces[position]}
             fooClick={() => barClick(position)}
           />
         );
       })}
     </div>
   );
  
  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((rowIndex) => renderRow(rowIndex))}
    </>
  );
}

export default function Game() {
  const [xActive, setXActive] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSpaces = history[currentMove];

  function handlePlay(newSpaces) {
    let newHistory = history.slice(0, currentMove + 1);
    newHistory.push(newSpaces);

    setHistory(newHistory);
    setXActive(!xActive);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXActive(nextMove % 2 === 0);
  }

  const moves = history.map((spaces, pos) => {
    let description = pos > 0 ? `Return to turn ${pos}` : "Restart the Game";

    if(pos === history.length - 1) {
      return(
        <li key={pos}>
          <h3>Viewing turn: {pos}</h3>
        </li>
      );
    }
    return(
      <li key={pos}>
        <button className="turn-button" onClick={() => jumpTo(pos)}>{description}</button>
      </li>
    );
  });

  return(
    <div className="game">
      <div className="game-board">
        <Board xActive={xActive} spaces={currentSpaces} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

// We'll just used the supplied alg for now
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

