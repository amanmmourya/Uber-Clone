import React, { useState } from 'react'
import './css_file/foundride.css'
const Agent = ({ control }) => {
    const [message,setMessage]=useState('')
    const [agent_Data,set_agentData]=useState('')
    const [isLoading,setLoading]=useState(false)
    
    const handleCross = () => {
        control.setAgent(false)
    }
    const handleChange = (e) =>{
        setMessage(e.target.value)
    }
    const handleSubmit=async (e)=>{
       if(message==''){
        alert("Please enter some prompt")
       }else{
        e.preventDefault()
        const tempMessage=message
        setLoading(true)
        setMessage('')
        const agentData=await fetch('http://127.0.0.1:3000/agent',{
            method:'POST',
            'Content-Type':'text/plain',
            body:tempMessage
        })
        setLoading(false)
        const final=await agentData.text()
        console.log(final)
        set_agentData(final)
       }

    }
    return (

        <div className="main-agent-container">
            <div className="head flex justify-start items-center">
                <div className="logo-agent h-16 w-16 mr-1 bg-red-50"></div>
                <div className="text-agent text-lg font-medium">Your Personal AI Companion</div>
                <div className="cross h-14 w-14 ml-10  bg-green-50" onClick={handleCross}></div>
            </div>
            <div className="agent-head h-12 w-full flex justify-start items-center">
                <div className="img-head h-10 w-10 ml-2"></div>
            </div>
            <div className="insights">
                {isLoading?<div className='text-2xl m-5'>Loading...</div>:<div className='text-blue-950 text-lg p-2 text-justify'>{agent_Data}</div>}
            </div>
            <div className="textarea-agent flex items-center justify-center">
                <form onSubmit={handleSubmit} className='flex items-center justify-center'>
                <input type="text"spellCheck={false} className='agent-message h-12 w-72' value={message} onChange={handleChange}/>
                <button type='submit' className="submit-agent h-12 w-12 ml-2 bg-red-50"></button>
                </form>
            </div>
        </div>
    )
}

export default Agent