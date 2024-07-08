import React from 'react'

const GameOver = ({winner,onRestart}) => {
  return (
    <div className="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>Game is draw.</p>}

        <p><button onClick={onRestart}>Rematch</button></p>
    </div>
  )
}

export default GameOver
