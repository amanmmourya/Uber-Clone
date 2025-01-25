import React, { useState } from 'react'
import './loginmain.css'
import '../output.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addUser } from '../redux/user/userSlice'
const Mainpage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting},
  }=useForm()
  const onSubmit=async (data)=>{
    console.log(data.username,"from testing terminal")
    dispatch(addUser(data))
      const result=await fetch('http://127.16.1.1:3000/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
     })
     const result_data=await result.json()
     console.log(result_data)
     if(result_data.success==true){
      navigate('/home')
     }
    //  adding data to redux store

  }
  const handleUsername=(e)=>{
    setUsername(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  return (
    <div>
      <div className="nav h-16 flex items-center w-full bg-gray-50">
        <div className="uber text-2xl font-semibold ml-20">Uber</div>
      </div>
      <div className="formdiv flex justify-center items-center w-full">
        <div className='mainformarea flex-col justify-center items-center h-3/4 w-1/2 bg-gray-50 '>
          <div className="loginbar h-20 w-full text-center font-bold text-3xl">Login Here</div>
          <form onSubmit={handleSubmit(onSubmit)} className="riderform flex-col w-full rounded-full">
            <input className='username' {...register('username',{required:{value:true,message:"Username is required"},minLength:{value:4,message:'Please enter atleast 4 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="text" placeholder='Username'/>
            {errors.username && <div className='text-red-600 text-sm text-center'>{errors.username.message}</div>}
            <input className='password' {...register('password',{required:{value:true,message:"Password is required"},minLength:{value:4,message:'Please enter atleast 4 characters'},maxLength:{value:15,message:"Maxm characters allowed is 15"}})} type="password" placeholder='Password'/>
            {errors.password && <div className='text-red-600 text-sm text-center'>{errors.password.message}</div>}
            <input className='mobileNop' {...register('mobileNop',{required:{value:true,message:"Password is required"},minLength:{value:10,message:'Mobile No should be of 10 digits'},maxLength:{value:10,message:"Mobile No should be of 10 digits"}})} type="text" placeholder='Mobile No'/>
            {errors.mobileNop && <div className='text-red-600 text-sm text-center'>{errors.mobileNop.message}</div>}

            <button type='submit' className=' submitbtn w-1/2 rounded-full text-2xl bg-black text-white'>Submit</button>
            {isSubmitting && <div className='text-center text-lg m-5'>Submitting...</div>}
          </form>
          <div className="signupbar h-30 w-full text-center">Don't have an account? sign up here</div>
        </div>
      </div>
    </div>
  )
}

export default Mainpage