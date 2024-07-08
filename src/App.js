import { useState } from "react";
import GameBoard from "./Component/GameBoard";
import Players from "./Component/Players";
import "./index.css";
import Log from "./Component/Log";
import { winning_ways } from "./Component/winning_ways";
import GameOver from "./Component/GameOver";


const PLAYERS={
  X:'Player1',
  O:'Player2'
}

const initalBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initalBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const derivedWinning = (gameBoard, playerName) => {
  let winner;
  for (const combination of winning_ways) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  const isActivePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = derivedWinning(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  function handleRestart() {
    setGameTurns([]);
  }
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerName((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div className="game-container">
        <ol className="players highlight-player">
          <Players
            name={PLAYERS.X}
            symbol="X"
            isActive={isActivePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Players
            name={PLAYERS.O}
            symbol="O"
            isActive={isActivePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
