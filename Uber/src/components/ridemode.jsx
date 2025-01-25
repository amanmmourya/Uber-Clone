import React from 'react'
import './css_file/ridemode.css'
import { useRef } from 'react'
const RideMode = () => {
    const buttonRef=useRef()
    const handleHover1=(e)=>{
  

    }
    return (
        <>
            <div className="suggestions font-bold text-4xl mt-20 ml-20">Suggestions</div>
            <div className='rideMode flex items-center justify-start h-60 w-full '>
                <div className="immediate flex h-40 w-90 rounded-xl overflow-hidden m-20 mt-20">
                    <div className='w-3/4 h-full bg-gray-200 '>
                        <div className="immtext text-lg font-medium mb-2 ml-2">Ride</div>
                        <div className="immdesc text-sm mb-4 ml-2" >Go anywhere with Uber. Request a ride, hop-in and go.</div>
                        <span ref={buttonRef} className='detail px-2 py-1 ml-5 rounded-2xl bg-white cursor-pointer' onMouseOver={handleHover1}>Details</span>
                    </div>   
                    <div className='immediateImg w-1/2 h-full'>
        
                    </div>
                </div>
                <div className="reserve flex h-40 w-90 rounded-xl overflow-hidden m-20 mt-20">
                    <div className='w-3/4 h-full bg-gray-200 '>
                        <div className="restext text-lg font-medium mb-2 ml-2">Reserve</div>
                        <div className="resdesc text-sm mb-4 ml-2" >Reserve your ride in advance so that you can relax on the day of trip.</div>
                        <span className='detail px-2 py-1 ml-5 rounded-2xl bg-white cursor-pointer'>Details</span>
                    </div>  
                    <div className='reserveImg w-1/2 h-full'>
      
                    </div>
                </div>
            </div>
        </>
    )
}

export default RideMode