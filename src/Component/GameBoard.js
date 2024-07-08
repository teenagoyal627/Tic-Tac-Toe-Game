const GameBoard = ({onSelectSquare,board}) => {



    // const[initialInput,setInitialInput]=useState(initalBoard)
   
    // const handleButtonClick=(rowIndex,colIndex)=>{
    //     setInitialInput((prevInput)=>{
    //         const userUpdatedInput=[...prevInput.map(innerArray=>[...innerArray])]
    //         userUpdatedInput[rowIndex][colIndex]=isActive
    //         return userUpdatedInput
    //     })
    //     onSelectSquare()

    // }
  return (
    <>
   <ol className="game-board">
    {board.map((row,rowIndex)=>(
        <li key={rowIndex}>
            <ol>
            {row.map((playerSymbol,colIndex)=>(
            <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
            </li>
            ))}

            </ol>
        </li>
    ))}
   </ol>
   </>
  )
}

export default GameBoard
