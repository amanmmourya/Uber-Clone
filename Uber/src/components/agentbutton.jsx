import React, { useState } from 'react'
import './css_file/foundride.css'
import Agent from './agent'
const Agentbutton = () => {
  const [isAgent,setAgent]=useState(false)

  const handleAgent=()=>{
    setAgent(true)
  }
  return (
    isAgent==true?(<div className='agent-main'><Agent control={{isAgent,setAgent}}/></div>):( <div className='agent-btn h-16 w-16 bg-red-100' onClick={handleAgent}> </div>)
  )
}

export default Agentbutton