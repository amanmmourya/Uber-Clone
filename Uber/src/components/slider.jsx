import React from 'react'
import '../output.css'
import { useRef } from 'react'
const Slider = () => {
    const btnRef=useRef()
    const scrollTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'})
    }
    const handleMouse=()=>{
        btnRef.current.style.transform='scale(1.01)'
        btnRef.current.style.transition='transform 0.1s ease-in-out'
        btnRef.current.style.boxShadow='0px 0px 10px 5px rgb(96,96,96,0.3)'
    }
    const handleLeave=()=>{
        btnRef.current.style.transform='scale(1)'
        btnRef.current.style.transition='transform 0.1s ease-in-out'
        btnRef.current.style.boxShadow='none'

    }
  return (
    <div ref= {btnRef} className='text-4xl rounded-full m-4 h-20 w-20 flex justify-center text-gray-600 items-center sticky bottom-4 left-full bg-gray-100 cursor-pointer' onClick={scrollTop} onMouseEnter={handleMouse} onMouseLeave={handleLeave}>^</div>
  )
}  

export default Slider