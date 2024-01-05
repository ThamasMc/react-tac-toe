import Square from './square.js';

export default function Board({ xActive, spaces, onPlay }) {
  let boardSize = 3;
  let count = 0;

  function barClick(pos) {
    if(spaces[pos] || calculateWinner(spaces)) return;

    let newSpaces = spaces.slice();

    let newCharacter = xActive ? 'X' : 'O'
    newSpaces[pos] = newCharacter;
    onPlay(newSpaces);
  }

  let winners = calculateWinner(spaces);

  if(winners) {
    status = `${xActive ? 'O' : 'X'} is our winner!`;
  } else if(!spaces.includes(null)) {
    status = "It's a draw!";
  } else {
    status = `It is ${xActive ? 'X' : 'O'}'s turn`
  }

   const renderRow = (rowIndex) => (
     <div className="board-row" key={rowIndex}>
       {[0, 1, 2].map((colIndex) => {
         const position = rowIndex * boardSize + colIndex;
         let winning_square = winners?.includes(position);
         return (
           <Square
             key={colIndex}
             position={posToWord(position)}
             val={spaces[position]}
             winner={ winning_square ? "winner" : ""}
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

function posToWord(position) {
  let posArr = [];
  if(position <= 2) {
    posArr.push("top");
  }
  if(position >= 6) {
    posArr.push("bottom");
  }
  if(position % 3 == 0) {
    posArr.push("left");
  }
  if(position % 3 == 2) {
    posArr.push("right");
  }

  return posArr.join(" ");
}

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
      return lines[i];
    }
  }
  return null;
}

