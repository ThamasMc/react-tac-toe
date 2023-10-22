import { useState } from 'react';

function Square() {
  const [val, setVal] = useState(null);

  function fooClick() {
    alert('This is annoying');
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

export default function Board() {
  let count = 0;
  return (
    <>
      <div class="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div class="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div class="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
    </>
  );
}
