import { useState } from 'react';
import Board from './components/board.js';

/* React words of wisdom: 
 * To collect data from multiple children, or to have two child components communicate with each other,
 * declare the shared state in their parent component instead. The parent component can pass that state
 * back down to the children via props. This keeps the child components in sync with each other and with their parent.
 *
 * Lifting state into a parent component is common when React components are refactored. */

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
