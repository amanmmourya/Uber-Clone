import React from 'react'
import'./css_file/foundride.css'
import DriverLoading from './DriverLoading'
const AutoRideFound = ({rideData}) => {
    console.log(rideData,"This data is received in the autoRideFound")
    if(rideData.notfound){
        return <div className="notfound text-center font-medium text-3xl">OOPS! No drivers found for this specific travel. Sorry for the Inconvinience</div>
    }
        
    
  return rideData.data?(

    <>
    <div className="main h-full w-full">
        <div className="container h-full flex-col justify-center items-center  w-full">
            <div className="head w-full h-1/6 flex text-white p-2 bg-blue-500">
                <div className="textinfo text-xl"><b className='text-2xl'>Check your ride everytime you enter</b><br/>Always check the license plate,car details and match driver's profile photo</div>
                <div className="imageinfo w-60 h-full bg-red-50"></div>
            </div>
            <div className="data w-full flex items-center justify-between bg-gray-50">
                <div className="leftside flex">
                    <div className="image-auto h-28 w-28 bg-red-50"></div>
                    <div className="driverName ml-2 text-3xl font-semibold flex justify-center items-center">{rideData.data?rideData.data.driverName:""}</div>
                </div>
                <div className="rightside flex-col">
                    <div className="vehicleName text-2xl"> Uber Auto</div>
                    <div className="price text-xl"><b>{"Price: "}</b>{rideData.price}{" Rs"}</div>
                    <div className="code text-xl"><b>Code:</b>{rideData.data?rideData.data.vehicleId:""}</div>
                </div>
            </div>
            <div className="contact w-full h-10 flex justify-center items-center bg-gray-50">
                <div className="image-mob h-10 w-10 bg-black"></div>
                <div className="mob text-xl font-medium ml-5">Contact No: {rideData.data?rideData.data.mobileNo:""}</div>
            </div>
            <div className='message text-2xl flex justify-center items-center m-5'>Driver is arriving to you. Kindly wait for a while ...</div>
        </div>
    </div>
    </>
  ):<DriverLoading/>
}

export default AutoRideFound