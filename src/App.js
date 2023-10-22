function Square({ val }) {
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
        <Square val={count++} />
        <Square val={count++} />
        <Square val={count++} />
      </div>
      <div class="board-row">
        <Square val={count++} />
        <Square val={count++} />
        <Square val={count++} />
      </div>
      <div class="board-row">
        <Square val={count++} />
        <Square val={count++} />
        <Square val={count++} />
      </div>
    </>
  );
}
