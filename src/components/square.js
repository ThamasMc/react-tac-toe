export default function Square({ val, fooClick, winner }){
  return(
    <button
      className={`square ${winner}`}
      onClick={fooClick}
    >
      { val }
    </button>
  );
}
