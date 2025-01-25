import React from 'react'
import './css_file/details.css'
import {NavLink,useNavigate} from 'react-router-dom'
const Details = () => {
    const navigate=useNavigate()
    const handleLogin=(e)=>{
        navigate('/login')
    }
    return (
        <>
            <div className="login w-full h-500-self flex justify-center items-center my-5">
                <div className="text-login w-2/5 h-full spacingInContent ">
                    <div className="heading font-bold text-5xl m-5 mx-5">Login to see your recent activity</div>
                    <div className="details text-lg mb-10  mx-5">View past trips, tailored suggestions, support resources, and more.</div>
                    <span className="getStarted mx-5 bg-black text-white py-3 px-5 text-2xl rounded-full " onClick={handleLogin}>Login to your account</span>
                </div>
                <div className="image-login h-full w-2/5 rounded-xl ">

                </div>
            </div>

            <div className="customDrive w-full h-500-self flex justify-center items-center my-5">
                <div className="image-customDrive h-full w-2/5 rounded-xl ">

                </div>
                <div className="text- w-2/5 h-full spacingInContent ">
                    <div className="heading font-bold text-5xl m-5 mx-5">Drive when you want, make what you need</div>
                    <div className="details text-lg mb-10  mx-5">Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</div>
                    <span className="getStarted mx-5 bg-black text-white py-3 px-5 text-2xl rounded-full ">Get Started</span>
                </div>

            </div>
            <div className="business w-full h-500-self flex justify-center items-center my-5">
                <div className="text-login w-2/5 h-full spacingInContent ">
                    <div className="heading font-bold text-5xl m-5 mx-5">The Uber you know, reimagined for business</div>
                    <div className="details text-lg mb-10  mx-5">Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</div>
                    <span className="getStarted mx-5 bg-black text-white py-3 px-5 text-2xl rounded-full ">Get Started</span>
                </div>
                <div className="image-business h-full w-2/5 rounded-xl ">

                </div>
            </div>
            <div className="renting w-full h-500-self flex justify-center items-center my-5">
                <div className="image-renting h-full w-2/5 rounded-xl ">
         
                </div>
                <div className="text-login w-2/5 h-full spacingInContent">
                    <div className="heading font-bold text-5xl m-5 mx-5">Make money by renting out your car</div>
                    <div className="details text-lg mb-10  mx-5">Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</div>
                    <span className="getStarted mx-5 bg-black text-white py-3 px-5 text-2xl rounded-full ">Get Started</span>
                </div>

            </div>
        </>
    )
}

export default Details