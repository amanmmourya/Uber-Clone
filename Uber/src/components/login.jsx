import React from 'react'
import './css_file/login.css'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate()
    return (
        <div className="main">
            <div className="content h-96 flex justify-center items-center ">
                <div className="text-login w-1/4 flex justify-center items-center h-full text-4xl font-bold">Log in to access your account</div>
                <div className="image w-1/3 m-5 h-full "></div>
            </div>
            <div className="login-mode h-48 w-full flex justify-evenly items-center">
                <div className="driver h-20 flex justify-center items-center text-5xl w-1/4 rounded-full text-center " onClick={()=>{navigate('/driver-signup')}}>
                        Driver
                </div>
                <div className="rider h-20 flex justify-center items-center text-5xl w-1/4 rounded-full text-center" onClick={()=>{navigate('/rider')}}>
                        Rider
                </div>
            </div>
        </div>
    )
}

export default Login