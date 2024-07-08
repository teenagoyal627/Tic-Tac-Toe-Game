import React, { useState } from 'react'
import './Players.module.css'
const Players = ({name,symbol,isActive,onChangeName}) => {

    const [isEditing,setIsEditing]=useState(false)
    const [playerName,setPlayerName]=useState(name)

    const handleChange=(e)=>{
        setPlayerName(e.target.value)
    }


    const editHandler=()=>{
     setIsEditing((editing)=>(!editing))
     if(isEditing){
        onChangeName(symbol,playerName)
     }
    }

    let EditPlayerName=<span className="player-name">{playerName}</span>
    if(isEditing)
        {
            EditPlayerName=  <input type='text' required value={playerName} onChange={handleChange}/>

        }
  return (
    
       <li className={isActive?'active':undefined}>
        <span className='player'>
         {EditPlayerName }
          <span className="player-symbol">{symbol}</span>
         <button onClick={editHandler}>{!isEditing ? 'Edit' :'Save'}</button>
          </span>
        </li>
   
  )
}

export default Players
