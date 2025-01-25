import React, { useState } from 'react'
import './loginmain.css'
import '../output.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addUser } from '../redux/user/userSlice'
const DriverSignup = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting},
  }=useForm()
  const onSubmit=async (data)=>{
    // dispatch(addUser(data))
    console.log("till here everything is fine...")
      const result=await fetch('http://127.16.1.1:3000/signup-driver',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
     })
     const result_data=await result.json()
     console.log(result_data)
     if(result_data.success==true){
      navigate('/driver-home')
     }
    //  adding data to redux store

  }
  const handleSignin=()=>{
      navigate('/driver-signin')
  }

  return (
    <div>
      <div className="nav h-16 flex items-center w-full bg-gray-50">
        <div className="uber text-2xl font-semibold ml-20">Uber</div>
      </div>
      <div className="formdiv-1 flex justify-center items-center w-full">
        <div className='mainformarea-1 flex-col justify-center items-center h-full w-1/2 bg-gray-50 '>
          <div className="loginbar h-20 w-full text-center font-bold text-3xl">Sign Up Here</div>
          <form onSubmit={handleSubmit(onSubmit)} className="riderform flex-col w-full rounded-full">
            <input className='username' {...register('username',{required:{value:true,message:"Username is required"},minLength:{value:4,message:'Please enter atleast 4 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="text" placeholder='Username'/>
            {errors.username && <div className='text-red-600 text-sm text-center'>{errors.username.message}</div>}
            <input className='password' {...register('password',{required:{value:true,message:"Password is required"},minLength:{value:4,message:'Please enter atleast 4 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="password" placeholder='Password'/>
            {errors.password && <div className='text-red-600 text-sm text-center'>{errors.password.message}</div>}
            <input className='mobileNo' {...register('mobileNo',{required:{value:true,message:"Mobile Number is required is required"},minLength:{value:10,message:'Mobile Number should be of 10 digit'},maxLength:{value:10,message:"Mobile Number should be of 10 digit"}})} type="text" placeholder='mobileNo'/>
            {errors.mobileNo && <div className='text-red-600 text-sm text-center'>{errors.mobileNo.message}</div>}
            <input className='vehicleId' {...register('vehicleId',{required:{value:true,message:"Vehicle Id is required"},minLength:{value:4,message:'Vehicle Id should be minimum of 4 digits'},maxLength:{value:9,message:"Vehicle Id should be less than 9 digits"}})} type="text" placeholder='vehicleId'/>
            {errors.vehicleId && <div className='text-red-600 text-sm text-center'>{errors.vehicleId.message}</div>}
            <input className='driverName1' {...register('driverName',{required:{value:true,message:"Driver Name is required"},minLength:{value:3,message:'Please enter atleast 3 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="text" placeholder='driverName'/>
            {errors.driverName && <div className='text-red-600 text-sm text-center'>{errors.driverName.message}</div>}
            <input className='vehicleType' {...register('vehicleType',{required:{value:true,message:"Type is required"},minLength:{value:4,message:'Please enter atleast 4 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="text" placeholder='vehicleType'/>
            {errors.vehicleType && <div className='text-red-600 text-sm text-center'>{errors.vehicleType.message}</div>}

            <button type='submit' className=' submitbtn w-1/2 rounded-full text-2xl bg-black text-white'>Submit</button>
            {isSubmitting && <div className='text-center text-lg m-5'>Submitting...</div>}
          </form>
          <div className="signupbar h-30 w-full text-center cursor-pointer" onClick={handleSignin}>Already have an account? sign in here</div>
        </div>
      </div>
    </div>
  )
}

export default DriverSignup