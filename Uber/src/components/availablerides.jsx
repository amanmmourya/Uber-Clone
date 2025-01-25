import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './css_file/allrides.css'
import { useSelector } from 'react-redux'
import Map from '../components/map'
import AutoRideFound from './autoRideFound'
const AvailableRides = () => {
    const location=useLocation()
    const dataReceived=location.state
    const customerData=useSelector((state)=>{return state.userInfo.value})
    const [isMap,setIsMap]=useState(true)
    const [foundRide,setFoundRide]=useState({})
    const handleAuto=async ()=>{
        setIsMap(false)
        let UberUniqueData={
            customerData:customerData,
            travelData:dataReceived,
            vehicleDemanded:'auto'
        }
        const foundRideData=await fetch('http://127.0.0.1:3000/find-ride',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(UberUniqueData)

        })
        const found_Ride=await foundRideData.json()
        if(found_Ride.notfound){
            setFoundRide({notfound:true})
            console.log(found_Ride)
        }else{
            setFoundRide(found_Ride)
        }
    }
  return (
    <>
    <div className="header h-10 bg-gray-50 w-full"></div>
    <div className="main1 flex">
        <div className="foundRides flex-col h-full w-1/2 bg-gray-50">
            <div className="ridehead h-14 text-3xl font-semibold text-center">Choose a ride</div>
            <div className="allrides">
                <div className="auto h-28 flex items-center justify-start w-full mb-4" onClick={handleAuto}>
                    <div className="autoimg h-24 w-32"></div>
                    <div className="autotext m-2"><b className='text-2xl' >Uber Auto</b><br/>No bargaining pick up at doorstep </div>
                </div>
                <div className="sedan flex items-center justify-start h-28 w-full mb-4">
                    <div className="sedanimg h-20 w-32"></div>
                    <div className="sedantext m-2"><b className='text-2xl'>Sedan</b><br/>Affordable, compact rides</div>
                </div>
                <div className="prime flex items-center justify-start h-28 w-full mb-4">
                    <div className="primeimg h-20 w-32"></div>
                    <div className="primetext m-2"><b className='text-2xl'>Prime</b><br/>Luxurious rides just at your doorstep</div>
                </div>
            </div>
        </div>
        <div className="map mx-5 h-full w-full">
            {isMap?(<Map from={dataReceived.from} to={dataReceived.to}/>):<AutoRideFound rideData={foundRide}/>}
        </div>
    </div>
    
    </>
  )
}

export default AvailableRides