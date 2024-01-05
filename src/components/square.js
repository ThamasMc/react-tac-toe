export default function Square({ val, fooClick, winner, position }){
  return(
    <button
      className={`square ${winner} ${position}`}
      onClick={fooClick}
    >
      { val }
    </button>
  );
}
