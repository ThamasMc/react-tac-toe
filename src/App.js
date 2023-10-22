import { useState } from 'react';

function Square({ val }) {

  function fooClick() {
    console.log('We are going to change this in a sec');
  }

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
  let count = 0;
  
  return (
    <>
      <div class="board-row">
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
      </div>
      <div class="board-row">
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
      </div>
      <div class="board-row">
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
        <Square val={spaces[count++]} />
      </div>
    </>
  );
}
