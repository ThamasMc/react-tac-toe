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

export default function Board() {
  const [spaces, setSpaces] = useState(Array(9).fill(0));
  const [xActive, setXActive] = useState(true);
  let count = 0;

  function barClick(pos){
    if(spaces[pos]) return;

    let newSpaces = spaces.slice();

    let newCharacter = xActive ? 'X' : 'O'
    newSpaces[pos] = newCharacter;
    setSpaces(newSpaces);
    setXActive(!xActive);
  }
  
  return (
    <>
      <div class="board-row">
        <Square val={spaces[count++]} fooClick={() => barClick(0)} />
        <Square val={spaces[count++]} fooClick={() => barClick(1)} />
        <Square val={spaces[count++]} fooClick={() => barClick(2)} />
      </div>
      <div class="board-row">
        <Square val={spaces[count++]} fooClick={() => barClick(3)} />
        <Square val={spaces[count++]} fooClick={() => barClick(4)} />
        <Square val={spaces[count++]} fooClick={() => barClick(5)} />
      </div>
      <div class="board-row">
        <Square val={spaces[count++]} fooClick={() => barClick(6)} />
        <Square val={spaces[count++]} fooClick={() => barClick(7)} />
        <Square val={spaces[count++]} fooClick={() => barClick(8)} />
      </div>
    </>
  );
}
