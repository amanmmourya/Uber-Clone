import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './css_file/home.css'
import Map from './map'
import {useNavigate} from 'react-router-dom'
const Homepage = () => {
  const navigate=useNavigate()
  const data = useSelector((state) => { return state.userInfo.value })
  const [fromArea, setFrom] = useState('')
  const [toArea, setTo] = useState('')
  const [from_, setFrom_] = useState(null)
  const [to_, setTo_] = useState(null)
  const handleFrom = (e) => {
    setFrom(e.target.value)

  }
  const handleTo = (e) => {
    setTo(e.target.value)

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFrom_(fromArea)
    setTo_(toArea)
    let rideData={from:fromArea,to:toArea}
    navigate('/available-rides',{state:rideData})
  }
  return (
    <>
      <div className="head h-10 flex items-center p-10 text-2xl w-full bg-gray-50 font-bold">Uber</div>
      <div className="mainbox flex justify-center items-center w-full">
        <div className="navigation flex-col ml-20 ">
          <div className="headtext h-14 w-72 m-2 text-2xl font-semibold flex items-center">Get a Ride</div>
          <form onSubmit={handleSubmit}>
            <div className="itemsofForm flex items-center justify-start">
              <div className='item1 h-10 w-10 '></div>
              <input type='text' value={fromArea} onChange={handleFrom} placeholder='Pickup location' className="from text-xl font-medium flex items-center pl-3 rounded-xl bg-gray-100 h-14 w-60 m-2"></input>
            </div>
            <div className="itemsofForm flex items-center justify-start">
              <div className='item2 h-10 w-10 '></div>
              <input type='text' value={toArea} onChange={handleTo} placeholder='Dropoff location' className="to text-xl font-medium flex items-center pl-3 rounded-xl bg-gray-100 h-14 w-60 m-2"></input>
            </div>
            <div className="itemsofForm flex items-center justify-start">
              <div className='item3 h-10 w-10 '></div>
              <input type='text' defaultValue={"Now"} className="time text-xl font-medium flex items-center pl-3 rounded-xl bg-gray-100 h-14 w-60 m-2"></input>
            </div>
            <div className="itemsofForm flex items-center justify-center">
              <button type='submit' className="search text-xl font-medium flex items-center justify-center pl-3 rounded-xl bg-gray-100 h-14 w-60 m-2">Search</button>
            </div>
          </form>
        </div>
        <div className="mapbox">
          {from_ && to_ ? (
            <Map from={from_} to={to_} />
          ) : (
            <Map from={'Surat'} to={'Surat'} />
          )}

        </div>
      </div>
    </>

  )
}

export default Homepage